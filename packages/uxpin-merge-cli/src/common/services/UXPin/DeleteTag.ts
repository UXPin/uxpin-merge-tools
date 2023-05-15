import { RepositoryPointerType } from '../../../../src/common/RepositoryPointerType';
import { isTestEnv } from '../../../program/env/isTestEnv';
import { axiosWithEnhancedError } from '../../../utils/axiosWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

export async function deleteTag(opts: { apiDomain: string; authToken: string; tag: string }): Promise<void> {
  // Skip updating repository pointers in test environment
  if (isTestEnv()) {
    return Promise.resolve();
  }

  await axiosWithEnhancedError({
    data: {
      pointerName: opts.tag,
      pointerType: RepositoryPointerType.Tag,
    },
    headers: {
      ...getAuthHeaders(opts.authToken),
      ...getUserAgentHeaders(),
    },
    responseType: 'json',
    method: 'DELETE',
    url: `${opts.apiDomain}/code/v/1.0/delete-repository-pointer`,
  });
}
