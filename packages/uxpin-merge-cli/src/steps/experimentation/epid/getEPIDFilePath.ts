import { resolve } from 'path';
import { TEMP_DIR_PATH } from '../../building/config/getConfig';

export const EPID_FILENAME = 'epid';

export function getEPIDFilePath(projectRoot: string): string {
  return resolve(projectRoot, TEMP_DIR_PATH, EPID_FILENAME);
}
