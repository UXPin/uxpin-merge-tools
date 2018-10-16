import { isAbsolute, join } from 'path';
import { ProgramArgs } from '../../ProgramArgs';

export function getConfigPath({ cwd, config }:ProgramArgs):string {
  if (isAbsolute(config)) {
    return config;
  }
  return join(cwd, config);
}
