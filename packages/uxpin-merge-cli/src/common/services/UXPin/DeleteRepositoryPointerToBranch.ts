import { RepositoryPointerType } from '../../../../src/common/RepositoryPointerType';
import { isTestEnv } from '../../../program/env/isTestEnv';
import { axiosWithEnhancedError } from '../../../utils/axiosWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

export async function deleteRepositoryPointerToBranch(opts: {
  apiDomain: string;
  authToken: string;
  branch: string;
}): Promise<void> {
  // Skip deleteing repository pointers in test environment
  if (isTestEnv()) {
    return Promise.resolve();
  }

  const branchName: string = opts.branch;

  await axiosWithEnhancedError({
    data: {
      pointerName: branchName,
      pointerType: RepositoryPointerType.Branch,
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
