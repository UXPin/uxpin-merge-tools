import { pathExists } from 'fs-extra';
import { PageContent } from '../../../../../../common/types/PageData';
import { DesignSystemSnapshot } from '../../../../../serialization/DesignSystemSnapshot';
import { getNewPageContent } from './getNewPageContent';
import { getPageContentFilePath } from './getPageContentFilePath';
import { readPageContent } from './readPageContent';

export async function getPageContent(
  contentContext:PageContentContext,
  metadata:DesignSystemSnapshot,
):Promise<PageContent> {
  const { uxpinDirPath } = contentContext;
  if (await existsPageFile(uxpinDirPath)) {
    return readPageContent(uxpinDirPath);
  }
  return getNewPageContent(contentContext, metadata);
}

function existsPageFile(uxpinDirPath:string):Promise<boolean> {
  return pathExists(getPageContentFilePath(uxpinDirPath));
}

export interface PageContentContext {
  revisionId:string;
  uxpinDirPath:string;
}
