// tslint:disable-next-line:import-name
import fetch from 'cross-fetch';
import { parseJson } from '../../utils/fetch/parseJson';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';

interface LatestCommitResponse {
  commitHash:string;
}

export async function getLatestCommitHash(domain:string, branch:string, token:string):Promise<string|null> {
  return fetch(`${domain}/code/v/1.0/branch/${branch}/latestCommit`, {
    headers: {
      ...getAuthHeaders(token),
      ...await getUserAgentHeaders(),
    },
    method: 'GET',
  })
    .then((response:Response) => parseJson<LatestCommitResponse>(response))
    .then((data:LatestCommitResponse|null) => data ? data.commitHash : null);
}
