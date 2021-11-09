import { isAbsolute, resolve } from 'path';
import { CreateAppProgramArgs, ProgramArgs } from '../../ProgramArgs';

export function getProjectRoot({ cwd }:Pick<Exclude<ProgramArgs, CreateAppProgramArgs>, 'cwd'>):string {
  if (isAbsolute(cwd)) {
    return cwd;
  }
  return resolve(cwd);
}
