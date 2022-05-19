import { RepositoryPointerType } from '../../../../src/common/RepositoryPointerType';
import { isTestEnv } from '../../../program/env/isTestEnv';
import { requestPromiseWithEnhancedError } from '../../../utils/requestPromiseWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';
import { encodeBranchName } from './params/encodeBranchName';

export async function updateRepositoryPointerToBranch(
  opts:{
    apiDomain:string,
    authToken:string,
    branch:string,
    commitHash:string,
  }):Promise<void> {

  // Skip updating repository pointers in test environment
  if (isTestEnv()) {
    return Promise.resolve();
  }

  const branchName:string = encodeBranchName(opts.branch);

  return requestPromiseWithEnhancedError(`${opts.apiDomain}/code/v/1.0/update-repository-pointer`, {
    body: {
      commitHash: opts.commitHash,
      pointerName: branchName,
      pointerType: RepositoryPointerType.Branch,
    },
    headers: {
      ...getAuthHeaders(opts.authToken),
      ...getUserAgentHeaders(),
    },
    json: true,
    method: 'POST',
  })
    .then(() => undefined);
}
