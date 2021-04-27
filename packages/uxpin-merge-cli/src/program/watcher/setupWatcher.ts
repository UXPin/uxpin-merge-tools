import { FSWatcher, watch, WatchOptions } from 'chokidar';
import { ProgramArgs } from '../args/ProgramArgs';
import { getConfigPath } from '../args/providers/paths/getConfigPath';
import { getTempDirPath } from '../args/providers/paths/getTempDirPath';

const DOT_FILES:RegExp = /(^|[\/\\])\../;
const NODE_MODULES:RegExp = /\/node_modules\//;

export async function setupWatcher(programArgs:ProgramArgs, onChangeListener:WatchListener):Promise<void> {
  return new Promise<void>((resolve, reject) => {

    const watchOptions:WatchOptions = {
      ignored: [
        DOT_FILES,
        NODE_MODULES,
        getConfigPath(programArgs),
        getTempDirPath(programArgs),
      ],
    };

    const watcher:FSWatcher = watch(programArgs.cwd, watchOptions);
    watcher.once('ready', () => resolve());
    watcher.on('change', onChangeListener);
  });
}

type WatchListener = (path:string) => void;
