import { pathExists } from 'fs-extra';
import { PageContent } from '../../../../../../common/types/PageData';
import { DesignSystemSnapshot } from '../../../../../serialization/DesignSystemSnapshot';
import { createNewPageContent } from './createNewPageContent';
import { getPageContentFilePath } from './getPageContentFilePath';
import { readPageContent } from './readPageContent';
import { writePageContent } from './writePageContent';

export async function getPageContent(
  contentContext: PageContentContext,
  metadata: DesignSystemSnapshot
): Promise<PageContent> {
  const { uxpinDirPath } = contentContext;
  if (!(await existsPageFile(uxpinDirPath))) {
    const freshPageContent: PageContent = await createNewPageContent(contentContext, metadata);
    await writePageContent(uxpinDirPath, freshPageContent);
  }
  return readPageContent(uxpinDirPath);
}

function existsPageFile(uxpinDirPath: string): Promise<boolean> {
  return pathExists(getPageContentFilePath(uxpinDirPath));
}

export interface PageContentContext {
  revisionId: string;
  uxpinDirPath: string;
}
