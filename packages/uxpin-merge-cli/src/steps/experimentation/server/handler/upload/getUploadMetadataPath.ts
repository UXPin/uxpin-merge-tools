import { join } from 'path';
import { UPLOAD_DIR_NAME, UPLOAD_METADATA_FILE_NAME } from './PrepareUploadHandler';

export function getUploadMetadataPath(uxpinDirPath: string, fileId: string): string {
  return join(uxpinDirPath, UPLOAD_DIR_NAME, fileId, UPLOAD_METADATA_FILE_NAME);
}
