import { ProjectPaths } from '../../../../steps/discovery/paths/ProjectPaths';
import { ProgramArgs } from '../../ProgramArgs';
import { getConfigPath } from './getConfigPath';
import { getProjectRoot } from './getProjectRoot';

export function getProjectPaths(programArgs:ProgramArgs):ProjectPaths {
  return {
    configPath: getConfigPath(programArgs),
    projectRoot: getProjectRoot(programArgs),
  };
}
