import { PageData } from '../../../../../../common/types/PageData';
import { CodeSyncMetadataInput, getCodeSyncMetadata } from './codeSync/getCodeSyncMetadata';

export function getPageData(input:CodeSyncMetadataInput):PageData {
  return {
    code_sync: getCodeSyncMetadata(input),
    component_version: null,
    components_master_ids: [],
    components_versions: [],
    components_versions_map: [],
    is_component: '0',
    last_update: '0',
    page: {
      canvas: {
        props: { storedElements: [] },
        type: 'Canvas',
        v: '2.0',
      },
    },
  };
}
