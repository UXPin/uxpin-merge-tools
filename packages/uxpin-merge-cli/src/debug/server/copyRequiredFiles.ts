import { copy, existsSync } from 'fs-extra';
import { join, resolve } from 'path';
import { Framework } from '../../framework/framework';
import { DEBUG_APP_BUNDLED_FILE } from '../../steps/building/config/getConfig';

export async function copyRequiredFiles(root:string):Promise<string> {
  const source:string = resolve(__dirname, `../../../dist/debug/server-${Framework.currentFrameworkName}`);
  const targetBundleFilePath:string = join(root, DEBUG_APP_BUNDLED_FILE);

  if (!existsSync(source)) {
    throw new Error(`🛑  ${Framework.currentFrameworkName} is not supported in server mode`);
  }

  await copy(source, root);
  return targetBundleFilePath;
}
