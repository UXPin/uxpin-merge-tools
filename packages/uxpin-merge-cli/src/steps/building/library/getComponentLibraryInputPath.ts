import { resolve } from 'path';
import { LIBRARY_INPUT_FILENAME } from '../config/getConfig';

export function getComponentLibraryInputPath(uxpinDirPath: string): string {
  return resolve(uxpinDirPath, LIBRARY_INPUT_FILENAME);
}
