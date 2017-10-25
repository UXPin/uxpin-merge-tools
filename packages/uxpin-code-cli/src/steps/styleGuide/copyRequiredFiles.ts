import { copy } from 'fs-extra';
import { join, relative, resolve } from 'path';
import { BUNDLE_FILE, TEMP_DIR_PATH } from '../building/config/getConfig';

export function copyRequiredFiles(projectRoot:string):Promise<string> {
  const source:string = resolve('../../../../dist', BUNDLE_FILE);
  const target:string = join(projectRoot, TEMP_DIR_PATH, BUNDLE_FILE);
  return copy(source, target).then(() => relative(join(projectRoot, TEMP_DIR_PATH), target));
}
