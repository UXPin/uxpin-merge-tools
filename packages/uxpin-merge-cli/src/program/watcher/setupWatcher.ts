import type { FSWatcher, ChokidarOptions } from 'chokidar';
import { ProgramArgs } from '../args/ProgramArgs';
import { getConfigPath } from '../args/providers/paths/getConfigPath';
import { getTempDirPath } from '../args/providers/paths/getTempDirPath';

const DOT_FILES = /(^|[\/\\])\../;
const NODE_MODULES = /\/node_modules\//;

export async function setupWatcher(programArgs: ProgramArgs, onChangeListener: WatchListener): Promise<void> {
  // chokidar 5 is ESM-only; Function() prevents TypeScript from compiling this to require()
  const { watch } = await (new Function('return import("chokidar")')() as Promise<typeof import('chokidar')>);

  return new Promise<void>((resolve) => {
    const watchOptions: ChokidarOptions = {
      ignored: [DOT_FILES, NODE_MODULES, getConfigPath(programArgs), getTempDirPath(programArgs)],
    };

    const watcher: FSWatcher = watch(programArgs.cwd, watchOptions);
    watcher.once('ready', resolve);
    watcher.on('change', onChangeListener);
  });
}

type WatchListener = (path: string) => void;
