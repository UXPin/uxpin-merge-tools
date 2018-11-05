import { pathExists } from 'fs-extra';
import { PageContent } from '../../../../../../common/types/PageData';
import { getNewPageContent } from './getNewPageContent';
import { getPageContentFilePath } from './getPageContentFilePath';
import { readPageContent } from './readPageContent';

export async function getPageContent(uxpinDirPath:string):Promise<PageContent> {
  if (await existsPageFile(uxpinDirPath)) {
    return readPageContent(uxpinDirPath);
  }
  return getNewPageContent();
}

function existsPageFile(uxpinDirPath:string):Promise<boolean> {
  return pathExists(getPageContentFilePath(uxpinDirPath));
}
