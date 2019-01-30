import { copy } from 'fs-extra';
import { dir, DirectoryResult } from 'tmp-promise';

export async function prepareTempDir(sourceDir:string):Promise<DirectoryResult> {
  const result:DirectoryResult = await dir({ unsafeCleanup: true });
  await copy(sourceDir, result.path, { errorOnExist: true });
  return result;
}
