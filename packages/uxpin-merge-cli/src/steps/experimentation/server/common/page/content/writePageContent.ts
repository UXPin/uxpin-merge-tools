import { writeJson } from 'fs-extra';
import { PageContent } from '../../../../../../common/types/PageData';
import { getPageContentFilePath } from './getPageContentFilePath';

export function writePageContent(uxpinDirPath:string, pageContent:PageContent):Promise<void> {
  return writeJson(getPageContentFilePath(uxpinDirPath), pageContent);
}
