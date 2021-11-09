import { join } from 'path';
import { TEMP_DIR_PATH } from '../../../../steps/building/config/getConfig';
import {CreateAppProgramArgs, ProgramArgs} from '../../ProgramArgs';
import { getProjectRoot } from './getProjectRoot';

export function getTempDirPath(args:Pick<Exclude<ProgramArgs, CreateAppProgramArgs>, 'cwd'>):string {
  return join(getProjectRoot(args), TEMP_DIR_PATH);
}
