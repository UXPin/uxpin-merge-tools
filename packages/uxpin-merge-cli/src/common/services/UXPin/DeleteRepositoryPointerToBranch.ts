import { RepositoryPointerType } from '../../../../src/common/RepositoryPointerType';
import { isTestEnv } from '../../../program/env/isTestEnv';
import { requestPromiseWithEnhancedError } from '../../../utils/requestPromiseWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';
import { encodeBranchName } from './params/encodeBranchName';

export async function deleteRepositoryPointerToBranch(opts: {
  apiDomain: string;
  authToken: string;
  branch: string;
}): Promise<void> {
  // Skip deleteing repository pointers in test environment
  if (isTestEnv()) {
    return Promise.resolve();
  }

  const branchName: string = encodeBranchName(opts.branch);

  await requestPromiseWithEnhancedError(`${opts.apiDomain}/code/v/1.0/delete-repository-pointer`, {
    body: {
      pointerName: branchName,
      pointerType: RepositoryPointerType.Branch,
    },
    headers: {
      ...getAuthHeaders(opts.authToken),
      ...getUserAgentHeaders(),
    },
    json: true,
    method: 'DELETE',
  });
}
