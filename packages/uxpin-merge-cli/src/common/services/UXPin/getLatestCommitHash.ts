import { requestPromiseWithEnhancedError } from '../../../utils/requestPromiseWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

interface LatestCommitResponse {
  commitHash:string;
}

export async function getLatestCommitHash(domain:string, branch:string, token:string):Promise<string | null> {
  const branchName:string = encodeURIComponent(branch);
  return requestPromiseWithEnhancedError(`${domain}/code/v/1.0/branch/${branchName}/latestCommit`, {
    headers: {
      ...getAuthHeaders(token),
      ...getUserAgentHeaders(),
    },
    json: true,
    method: 'GET',
  })
    .then((data:LatestCommitResponse | null) => data ? data.commitHash : null);
}
