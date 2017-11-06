import { copy } from 'fs-extra';
import { join, resolve } from 'path';
import { DEBUG_APP_BUNDLED_FILE } from '../../steps/building/config/getConfig';

export function copyRequiredFiles(root:string):Promise<string> {
  const source:string = resolve(__dirname, '../../../dist/debug/server', DEBUG_APP_BUNDLED_FILE);
  const target:string = join(root, DEBUG_APP_BUNDLED_FILE);
  return copy(source, target).then(() => target);
}
