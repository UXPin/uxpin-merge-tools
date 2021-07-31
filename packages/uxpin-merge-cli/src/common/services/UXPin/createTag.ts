import { isTestEnv } from '../../../program/env/isTestEnv';
import { requestPromiseWithEnhancedError } from '../../../utils/requestPromiseWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';
import { RepositoryPointerType } from './updateRepositoryPointerToBranch';

export async function createTag(
  opts:{
    apiDomain:string,
    authToken:string,
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
    try {
      await createTagRepositoryPointer(opts)
        .then(() => undefined);
    } catch (error) {
      // Could throw error if the tag already exists
      throw new Error(error.message);
    }
  }
}

async function createTagRepositoryPointer(
  opts:{
    apiDomain:string,
    authToken:string,
    commitHash:string,
    tag:string,
  }):Promise<void> {

  return requestPromiseWithEnhancedError(`${opts.apiDomain}/code/v/1.0/create-tag`, {
    body: {
      authToken: opts.authToken,
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
