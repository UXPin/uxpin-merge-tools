import { copy } from 'fs-extra';
import { join, resolve } from 'path';
import { STYLEGUIDE_BUNDLE_FILE } from '../building/config/getConfig';

export function copyRequiredFiles(root:string):Promise<string> {
  const source:string = resolve('../../../../dist', STYLEGUIDE_BUNDLE_FILE);
  const target:string = join(root, STYLEGUIDE_BUNDLE_FILE);
  return copy(source, target).then(() => target);
}
