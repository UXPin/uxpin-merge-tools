import { RepositoryPointerType } from '../../../../src/common/RepositoryPointerType';
import { isTestEnv } from '../../../program/env/isTestEnv';
import { requestPromiseWithEnhancedError } from '../../../utils/requestPromiseWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

export async function deleteTag(opts: { apiDomain: string; authToken: string; tag: string }): Promise<void> {
  // Skip updating repository pointers in test environment
  if (isTestEnv()) {
    return Promise.resolve();
  }

  await requestPromiseWithEnhancedError(`${opts.apiDomain}/code/v/1.0/delete-repository-pointer`, {
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
  });
}
