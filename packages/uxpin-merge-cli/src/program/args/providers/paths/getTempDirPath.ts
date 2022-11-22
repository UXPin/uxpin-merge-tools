import { join } from 'path';
import { TEMP_DIR_PATH } from '../../../../steps/building/config/getConfig';
import { GenerateAppProgramArgs, ProgramArgs } from '../../ProgramArgs';
import { getProjectRoot } from './getProjectRoot';

export function getTempDirPath(args: Pick<Exclude<ProgramArgs, GenerateAppProgramArgs>, 'cwd'>): string {
  return join(getProjectRoot(args), TEMP_DIR_PATH);
}
