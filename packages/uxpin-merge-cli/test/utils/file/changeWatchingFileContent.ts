import { ChildProcess } from 'child_process';
import { writeToFile } from '../../../src/utils/fs/writeToFile';

const PROCESS_DATA_EVENT = 'data';

export function changeWatchingFileContent({
  content,
  filePath,
  successMatcher,
  subprocess,
}: ChangeFileContentOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    setupOutputListeners(subprocess, successMatcher).then(resolve).catch(reject);

    process.nextTick(async () => {
      try {
        await writeToFile(filePath, content);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function setupOutputListeners(subprocess: ChildProcess, successMatcher: string): Promise<void> {
  return new Promise((resolve, reject) => {
    let settled = false;
    let stderrAccumulated = '';
    let debounceTimer: ReturnType<typeof setTimeout> | null = null;

    const cleanup = () => {
      subprocess.stdout!.removeListener(PROCESS_DATA_EVENT, changeListener);
      subprocess.stderr!.removeListener(PROCESS_DATA_EVENT, stdErrorDataListener);
      if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
      }
    };

    const changeListener: (data: Buffer) => void = (data) => {
      if (!data.toString().match(new RegExp(successMatcher))) {
        return;
      }
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      resolve();
    };

    // Accumulate stderr and wait for webpack to go quiet before rejecting.
    // This prevents leftover error chunks from triggering the next listener
    // when changeProjectFile is called again immediately after catching the error.
    const stdErrorDataListener: (data: Buffer) => void = (data) => {
      stderrAccumulated += data.toString();
      if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        if (settled) {
          return;
        }
        settled = true;
        cleanup();
        reject(stderrAccumulated);
      }, 300);
    };

    subprocess.stdout!.addListener(PROCESS_DATA_EVENT, changeListener);
    subprocess.stderr!.addListener(PROCESS_DATA_EVENT, stdErrorDataListener);
  });
}

interface ChangeFileContentOptions {
  filePath: string;
  content: string;
  subprocess: ChildProcess;
  successMatcher: string;
}
