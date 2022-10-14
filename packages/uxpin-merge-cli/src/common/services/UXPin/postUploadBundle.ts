import { createReadStream } from 'fs';
import { requestPromiseWithEnhancedError } from '../../../utils/requestPromiseWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

export interface UploadBundleResponse {
  url: string;
}

export async function postUploadBundle(
  domain: string,
  token: string,
  commitHash: string,
  path: string
): Promise<UploadBundleResponse | null> {
  return requestPromiseWithEnhancedError(`${domain}/code/v/1.0/push/bundle`, {
    formData: {
      bundle: createReadStream(path),
      commitHash,
    },
    headers: {
      ...getAuthHeaders(token),
      ...getUserAgentHeaders(),
    },
    json: true,
    method: 'POST',
  });
}
