import { FSWatcher, watch, WatchOptions } from 'chokidar';
import { ProgramArgs } from '../args/ProgramArgs';
import { getConfigPath } from '../args/providers/paths/getConfigPath';
import { getTempDirPath } from '../args/providers/paths/getTempDirPath';

const DOT_FILES:RegExp = /(^|[\/\\])\../;
const NODE_MODULES:RegExp = /^\/node_modules\//;

export function setupWatcher(programArgs:ProgramArgs, onChangeListener:WatchListener):void {
  const watchOptions:WatchOptions = {
    ignored: [
      DOT_FILES,
      NODE_MODULES,
      getConfigPath(programArgs),
      getTempDirPath(programArgs),
    ],
  };

  const watcher:FSWatcher = watch(programArgs.cwd, watchOptions);
  watcher.on('change', onChangeListener);
}

type WatchListener = (path:string) => void;
