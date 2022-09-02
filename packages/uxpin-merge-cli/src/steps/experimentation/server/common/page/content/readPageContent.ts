import { readJson } from 'fs-extra';
import { PageContent } from '../../../../../../common/types/PageData';
import { getPageContentFilePath } from './getPageContentFilePath';

export function readPageContent(uxpinTempDirPath: string): Promise<PageContent> {
  return readJson(getPageContentFilePath(uxpinTempDirPath));
}
