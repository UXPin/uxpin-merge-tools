import { AxiosResponse } from 'axios';
import { DSMetadata } from '../../../program/DSMeta';
import { axiosWithEnhancedError } from '../../../utils/axiosWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

export interface PushMetadataResponse {
  message:string;
}

export async function postPushMetadata(
  domain:string,
  token:string,
  metadata:DSMetadata,
):Promise<PushMetadataResponse | null> {
  return axiosWithEnhancedError({
    data: metadata.result,
    headers: {
      ...getAuthHeaders(token),
      ...getUserAgentHeaders(),
    },
    method: 'POST',
    responseType: 'json',
    url: `${domain}/code/v/1.0/push`,
  }).then((response:AxiosResponse) => (response.data as PushMetadataResponse || null));
}
