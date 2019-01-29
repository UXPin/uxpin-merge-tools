import * as requestPromise from 'request-promise';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

interface LatestCommitResponse {
  commitHash:string;
}

export async function getLatestCommitHash(domain:string, branch:string, token:string):Promise<string|null> {
  return requestPromise(`${domain}/code/v/1.0/branch/${branch}/latestCommit`, {
    headers: {
      ...getAuthHeaders(token),
      ...await getUserAgentHeaders(),
    },
    json: true,
    method: 'GET',
  })
    .then((data:LatestCommitResponse|null) => data ? data.commitHash : null);
}
