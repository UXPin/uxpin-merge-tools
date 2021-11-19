import { ProjectPaths } from '../../../../steps/discovery/paths/ProjectPaths';
import { CreateAppProgramArgs, ProgramArgs } from '../../ProgramArgs';
import { getConfigPath } from './getConfigPath';
import { getProjectRoot } from './getProjectRoot';

export function getProjectPaths(programArgs:Exclude<ProgramArgs, CreateAppProgramArgs>):ProjectPaths {
  const { cwd, config } = programArgs;
  return {
    configPath: getConfigPath({ cwd, config }),
    projectRoot: getProjectRoot(programArgs),
  };
}
