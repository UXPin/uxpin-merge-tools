import { copy } from 'fs-extra';
import { join, resolve } from 'path';
import { DEBUG_APP_BUNDLED_FILE } from '../../steps/building/config/getConfig';

export async function copyRequiredFiles(root: string): Promise<string> {
  const source: string = resolve(__dirname, '../../../dist/debug/server');
  const targetBundleFilePath: string = join(root, DEBUG_APP_BUNDLED_FILE);
  await copy(source, root);
  return targetBundleFilePath;
}
