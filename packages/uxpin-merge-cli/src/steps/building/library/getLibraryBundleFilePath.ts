import { resolve } from 'path';
import { LIBRARY_OUTPUT_FILENAME } from '../config/getConfig';

export function getLibraryBundleFilePath(uxpinTempDir:string):string {
  return resolve(uxpinTempDir, LIBRARY_OUTPUT_FILENAME);
}
