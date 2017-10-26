import { copy } from 'fs-extra';
import { join, relative, resolve } from 'path';
import { STYLEGUIDE_BUNDLE_FILE, TEMP_DIR_PATH } from '../building/config/getConfig';

export function copyRequiredFiles(projectRoot:string):Promise<string> {
  const source:string = resolve('../../../../dist', STYLEGUIDE_BUNDLE_FILE);
  const target:string = join(projectRoot, TEMP_DIR_PATH, STYLEGUIDE_BUNDLE_FILE);
  return copy(source, target).then(() => relative(join(projectRoot, TEMP_DIR_PATH), target));
}
