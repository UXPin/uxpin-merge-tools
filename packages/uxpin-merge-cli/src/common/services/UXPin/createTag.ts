import { isTestEnv } from '../../../program/env/isTestEnv';
import { requestPromiseWithEnhancedError } from '../../../utils/requestPromiseWithEnhancedError';
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

  return requestPromiseWithEnhancedError(`${opts.apiDomain}/code/v/1.0/create-tag`, {
    body: {
      commitHash: opts.commitHash,
      tagName: opts.tag,
    },
    headers: {
      ...getAuthHeaders(opts.authToken),
      ...getUserAgentHeaders(),
    },
    json: true,
    method: 'POST',
  }).then(() => undefined);
}
