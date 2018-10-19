import { resolve } from 'path';
import { ProgramArgs } from '../../ProgramArgs';

export function getConfigPath({ cwd, config }:ProgramArgs):string {
  return resolve(cwd, config);
}
