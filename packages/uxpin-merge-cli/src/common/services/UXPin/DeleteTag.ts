import { isTestEnv } from '../../../program/env/isTestEnv';
import { requestPromiseWithEnhancedError } from '../../../utils/requestPromiseWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

export const enum RepositoryPointerType {
    Branch = 'branch',
    Tag = 'tag',
}

export async function deleteTag(
    opts:{
      apiDomain:string,
      authToken:string,
      tag:string,
    }):Promise<void> {

 // Skip updating repository pointers in test environment
  if (isTestEnv()) {
    return Promise.resolve();
  }

  return requestPromiseWithEnhancedError(`${opts.apiDomain}/code/v/1.0/delete-repository-pointer`, {
    body: {
      pointerName: opts.tag,
      pointerType: RepositoryPointerType.Tag,
    },
    headers: {
      ...getAuthHeaders(opts.authToken),
      ...getUserAgentHeaders(),
    },
    json: true,
    method: 'DELETE',
  }).then(() => undefined);
}
