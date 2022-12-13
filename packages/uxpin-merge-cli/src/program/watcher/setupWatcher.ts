import { FSWatcher, watch, WatchOptions } from 'chokidar';
import { CreateAppProgramArgs, ProgramArgs } from '../args/ProgramArgs';
import { getConfigPath } from '../args/providers/paths/getConfigPath';
import { getTempDirPath } from '../args/providers/paths/getTempDirPath';

const DOT_FILES = /(^|[\/\\])\../;
const NODE_MODULES = /\/node_modules\//;

export async function setupWatcher(
    programArgs:Exclude<ProgramArgs, CreateAppProgramArgs>,
    onChangeListener:WatchListener,
):Promise<void> {
  return new Promise<void>((resolve, reject) => {

    const { cwd, config } = programArgs;
    const watchOptions:WatchOptions = {
      ignored: [
        DOT_FILES,
        NODE_MODULES,
        getConfigPath({ cwd, config }), getTempDirPath(programArgs)],
    };

    const watcher: FSWatcher = watch(programArgs.cwd, watchOptions);
    watcher.once('ready', () => resolve());
    watcher.on('change', onChangeListener);
  });
}

type WatchListener = (path: string) => void;
