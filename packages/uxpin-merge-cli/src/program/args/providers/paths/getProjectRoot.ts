import { isAbsolute, resolve } from 'path';
import { GenerateAppProgramArgs, ProgramArgs } from '../../ProgramArgs';

export function getProjectRoot({ cwd }: Pick<Exclude<ProgramArgs, GenerateAppProgramArgs>, 'cwd'>): string {
  if (isAbsolute(cwd)) {
    return cwd;
  }
  return resolve(cwd);
}
