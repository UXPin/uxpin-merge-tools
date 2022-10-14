import { join } from 'path';
import { PAGE_FILE_NAME } from '../../../handler/page/save/PageSaveHandler';

export function getPageContentFilePath(uxpinDirPath: string): string {
  return join(uxpinDirPath, PAGE_FILE_NAME);
}
