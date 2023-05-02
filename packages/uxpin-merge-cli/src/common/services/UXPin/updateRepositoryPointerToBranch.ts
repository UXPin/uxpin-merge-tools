import { isTestEnv } from '../../../program/env/isTestEnv';
import { axiosWithEnhancedError } from '../../../utils/axiosWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';
import { encodeBranchName } from './params/encodeBranchName';

export const enum RepositoryPointerType {
  Branch = 'branch',
  Tag = 'tag',
}

export async function updateRepositoryPointerToBranch(opts: {
  apiDomain: string;
  authToken: string;
  branch: string;
  commitHash: string;
}): Promise<void> {
  // Skip updating repository pointers in test environment
  if (isTestEnv()) {
    return Promise.resolve();
  }

  if (!opts) {
    throw new Error('Missing/invalid options');
  }
  if (!opts.apiDomain) {
    throw new Error('Missing API domain for repository pointer update');
  }
  if (!opts.branch) {
    throw new Error('Missing branch name for repository pointer update');
  }
  if (!opts.commitHash) {
    throw new Error('Missing commit hash for repository pointer update');
  }
  if (!opts.authToken) {
    throw new Error('Missing auth token for repository pointer update');
  }

  const branchName: string = encodeBranchName(opts.branch);

  return axiosWithEnhancedError({
    data: {
      commitHash: opts.commitHash,
      pointerName: branchName,
      pointerType: RepositoryPointerType.Branch,
    },
    headers: {
      ...getAuthHeaders(opts.authToken),
      ...getUserAgentHeaders(),
    },
    method: 'POST',
    responseType: 'json',
    url: `${opts.apiDomain}/code/v/1.0/update-repository-pointer`,
  }).then(() => undefined);
}
