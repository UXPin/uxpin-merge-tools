import fetch from 'cross-fetch';
import { DSMetadata } from '../../program/DSMeta';
import { parseJson } from '../../utils/fetch/parseJson';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

export interface PushMetadataResponse {
  message:string;
}

export async function postPushMetadata(
  domain:string,
  token:string,
  metadata:DSMetadata,
):Promise<PushMetadataResponse|null> {
  return fetch(`${domain}/code/push/v/0.0`, {
    body: JSON.stringify(metadata.result),
    headers: {
      ...getAuthHeaders(token),
      ...await getUserAgentHeaders(),
    },
    method: 'POST',
  })
    .then((response:Response) => parseJson<PushMetadataResponse>(response))
    .then((data:PushMetadataResponse|null) => data ? data : null);
}
