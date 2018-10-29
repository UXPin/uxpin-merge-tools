import { ChildProcess } from 'child_process';
import { writeToFile } from '../../../src/utils/fs/writeToFile';

const PROCESS_DATA_EVENT:string = 'data';

export function changeWatchingFileContent({
  content,
  filePath,
  successMatcher,
  subprocess,
}:ChangeFileContentOptions):Promise<void> {
  return new Promise((resolve, reject) => {
    setupOutputListeners(subprocess, successMatcher)
      .then(resolve)
      .catch(reject);

    process.nextTick(async () => {
      try {
        await writeToFile(filePath, content);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function setupOutputListeners(subprocess:ChildProcess, successMatcher:string):Promise<void> {
  return new Promise((resolve, reject) => {
    const changeListener:(data:Buffer) => void = (data) => {
      if (!data.toString().match(new RegExp(successMatcher))) {
        return;
      }

      subprocess.stdout.removeListener(PROCESS_DATA_EVENT, changeListener);
      resolve();
    };

    const stdErrorDataListener:(data:Buffer) => void = (data) => {
      subprocess.stdout.removeListener(PROCESS_DATA_EVENT, changeListener);
      reject(data.toString());
    };

    subprocess.stdout.addListener(PROCESS_DATA_EVENT, changeListener);
    subprocess.stderr.addListener(PROCESS_DATA_EVENT, stdErrorDataListener);
  });
}

interface ChangeFileContentOptions {
  filePath:string;
  content:string;
  subprocess:ChildProcess;
  successMatcher:string;
}
