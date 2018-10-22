import { CodeSyncMetadata } from '../../../../../../../common/types/CodeSyncMetadata';
import { DesignSystemSnapshot } from '../../../../../../serialization/DesignSystemSnapshot';
import { getComponentsCollection } from './component/getComponentsCollection';
import { getPresetsCollection } from './preset/getPresetsCollection';

export function getCodeSyncMetadata(input:CodeSyncMetadataInput):CodeSyncMetadata {
  const { revisionId, port } = input;
  return {
    bundles: {
      [revisionId]: `http://localhost:${port}/code/library.js`,
    },
    components: getComponentsCollection(input),
    presets: getPresetsCollection(input),
  };
}

export interface CodeSyncMetadataInput {
  metadata:DesignSystemSnapshot;
  port:number;
  revisionId:string;
}
