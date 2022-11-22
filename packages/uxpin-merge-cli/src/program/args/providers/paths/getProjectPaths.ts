import { ProjectPaths } from '../../../../steps/discovery/paths/ProjectPaths';
import { GenerateAppProgramArgs, ProgramArgs } from '../../ProgramArgs';
import { getConfigPath } from './getConfigPath';
import { getProjectRoot } from './getProjectRoot';

export function getProjectPaths(programArgs: Exclude<ProgramArgs, GenerateAppProgramArgs>): ProjectPaths {
  return {
    configPath: getConfigPath(programArgs),
    projectRoot: getProjectRoot(programArgs),
  };
}
