import { isTestEnv } from '../../../program/env/isTestEnv';
import { requestPromiseWithEnhancedError } from '../../../utils/requestPromiseWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';
import { encodeBranchName } from './params/encodeBranchName';

export const enum RepositoryPointerType {
  Branch = 'branch',
  Tag = 'tag',
}

export async function updateRepositoryPointerToBranchOrTag(
  opts:{
    apiDomain:string,
    authToken:string,
    branch:string,
    commitHash:string,
    tag:string,
  }):Promise<void> {

  // Skip updating repository pointers in test environment
  if (isTestEnv()) {
    return Promise.resolve();
  }

  if (!opts) { throw new Error('Missing/invalid options'); }
  if (!opts.apiDomain) { throw new Error('Missing API domain for repository pointer update'); }
  if (!opts.commitHash) { throw new Error('Missing commit hash for repository pointer update'); }
  if (!opts.authToken) { throw new Error('Missing auth token for repository pointer update'); }

  // If an optional tag was provided then we need to make a duplicate repository
  // pointer with type 'tag' that points to the same commit hash
  if (opts.tag) {
    updateRepositoryPointerToTag(opts)
      .then(() => undefined);
  }

  return updateRepositoryPointerToBranch(opts)
    .then(() => undefined);
}

async function updateRepositoryPointerToBranch(
  opts:{
    apiDomain:string,
    authToken:string,
    branch:string,
    commitHash:string,
    tag:string,
  }):Promise<void> {

  if (!opts.branch) { throw new Error('Missing branch name for repository pointer update'); }

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

async function updateRepositoryPointerToTag(
  opts:{
    apiDomain:string,
    authToken:string,
    branch:string,
    commitHash:string,
    tag:string,
  }):Promise<void> {

  if (!opts.tag) { throw new Error('Missing tag for repository pointer update'); }

  return requestPromiseWithEnhancedError(`${opts.apiDomain}/code/v/1.0/update-repository-pointer`, {
    body: {
      commitHash: opts.commitHash,
      pointerName: opts.tag,
      pointerType: RepositoryPointerType.Tag,
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
