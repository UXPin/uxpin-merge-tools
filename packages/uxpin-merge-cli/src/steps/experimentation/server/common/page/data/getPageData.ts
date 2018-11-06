import { PageContent, PageData } from '../../../../../../common/types/PageData';
import { CodeSyncMetadataInput, getCodeSyncMetadata } from './codeSync/getCodeSyncMetadata';

export function getPageData(input:PageDataInput):PageData {
  return {
    code_sync: getCodeSyncMetadata(input),
    component_version: null,
    components_master_ids: [],
    components_versions: [],
    components_versions_map: [],
    is_component: '0',
    last_update: '0',
    page: input.pageContent,
  };
}

export interface PageDataInput extends CodeSyncMetadataInput {
  pageContent:PageContent;
}
