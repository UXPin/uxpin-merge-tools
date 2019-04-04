import { PageContent, PageData } from '../../../../../../common/types/PageData';
import { DesignSystemSnapshot } from '../../../../../serialization/DesignSystemSnapshot';
import { getProjectMetadata } from '../../../../metadata/getProjectMetadata';
import { getPageContent } from '../content/getPageContent';
import { getCodeSyncMetadata } from './codeSync/getCodeSyncMetadata';

export async function getPageData(input:PageDataInput):Promise<PageData> {
  const { ngrokSessionId, port, revisionId, uxpinDirPath } = input;
  const metadata:DesignSystemSnapshot = await getProjectMetadata(uxpinDirPath);
  const pageContent:PageContent = await getPageContent(uxpinDirPath);

  return {
    code_sync: getCodeSyncMetadata({ ngrokSessionId, metadata, port, revisionId }),
    component_version: null,
    components_master_ids: [],
    components_versions: [],
    components_versions_map: [],
    is_component: '0',
    last_update: '0',
    page: pageContent,
  };
}

export interface PageDataInput {
  ngrokSessionId?:string | null;
  port:number;
  revisionId:string;
  uxpinDirPath:string;
}
