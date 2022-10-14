import * as path from 'path';
import { METADATA_FILE_NAME } from './saveMetadata';

export function getMetadataFilePath(uxpinDirPath: string): string {
  return path.resolve(uxpinDirPath, METADATA_FILE_NAME);
}
