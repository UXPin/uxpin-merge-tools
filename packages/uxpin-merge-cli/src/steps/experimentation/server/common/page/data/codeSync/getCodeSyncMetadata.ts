import { CodeSyncMetadata } from '../../../../../../../common/types/CodeSyncMetadata';
import { DesignSystemSnapshot } from '../../../../../../serialization/DesignSystemSnapshot';
import { getComponentsCollection } from './component/getComponentsCollection';
import { getPresetsCollection } from './preset/getPresetsCollection';

export function getCodeSyncMetadata(input:CodeSyncMetadataInput):CodeSyncMetadata {
  const { ngrokSessionId, port, revisionId } = input;

  return {
    bundles: {
      [revisionId]: getBundleUrl(port, ngrokSessionId),
    },
    components: getComponentsCollection(input),
    presets: getPresetsCollection(input),
  };
}

function getBundleUrl(port:number, ngrokSessionId?:string):string {
  return ngrokSessionId
    ? `https://${ngrokSessionId}.ngrok.io/code/library.js`
    : `http://localhost:${port}/code/library.js`;
}

export interface CodeSyncMetadataInput {
  ngrokSessionId?:string;
  metadata:DesignSystemSnapshot;
  port:number;
  revisionId:string;
}
