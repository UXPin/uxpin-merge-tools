import { isTestEnv } from '../../../program/env/isTestEnv';
import { axiosWithEnhancedError } from '../../../utils/axiosWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

export async function createTag(opts: {
  apiDomain: string;
  authToken: string;
  commitHash: string;
  tag: string;
}): Promise<void> {
  // Skip updating repository pointers in test environment
  if (isTestEnv()) {
    return Promise.resolve();
  }

  return axiosWithEnhancedError({
    data: {
      commitHash: opts.commitHash,
      tagName: opts.tag,
    },
    headers: {
      ...getAuthHeaders(opts.authToken),
      ...getUserAgentHeaders(),
    },
    responseType: 'json',
    method: 'POST',

    url: `${opts.apiDomain}/code/v/1.0/create-tag`,
  }).then(() => undefined);
}
