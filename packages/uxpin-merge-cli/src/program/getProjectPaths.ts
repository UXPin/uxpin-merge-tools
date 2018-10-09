import { ProjectPaths } from '../steps/discovery/paths/ProjectPaths';
import { getConfigPath } from './getConfigPath';
import { ProgramArgs } from './ProgramArgs';

export function getProjectPaths(programArgs:ProgramArgs):ProjectPaths {
  return {
    configPath: getConfigPath(programArgs),
    projectRoot: programArgs.cwd,
  };
}
