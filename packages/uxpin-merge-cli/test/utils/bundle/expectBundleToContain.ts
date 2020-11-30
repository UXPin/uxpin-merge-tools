import { readFile } from 'fs-extra';
import { join } from 'path';
import { LIBRARY_OUTPUT_FILENAME, TEMP_DIR_PATH } from '../../../src/steps/building/config/getConfig';

export async function expectBundleToContain(projectDir:string, expectedValue:string):Promise<void> {
  const bundlePath:string = join(projectDir, TEMP_DIR_PATH, LIBRARY_OUTPUT_FILENAME);
  const bundleContent:string = await readFile(bundlePath, { encoding: 'utf8' });
  if (!bundleContent.includes(expectedValue)) {
    throw new Error('Did not found expected string in library bundle');
  }
}
