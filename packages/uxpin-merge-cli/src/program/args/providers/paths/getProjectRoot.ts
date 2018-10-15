import { isAbsolute, resolve } from 'path';
import { ProgramArgs } from '../../ProgramArgs';

export function getProjectRoot({ cwd }:Pick<ProgramArgs, 'cwd'>):string {
  if (isAbsolute(cwd)) {
    return cwd;
  }
  return resolve(cwd);
}
