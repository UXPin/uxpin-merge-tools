import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios';
import { axiosWithEnhancedError } from '../../../utils/axiosWithEnhancedError';
import { getAuthHeaders } from './headers/getAuthHeaders';
import { getUserAgentHeaders } from './headers/getUserAgentHeaders';
import { encodeBranchName } from './params/encodeBranchName';

interface LatestCommitResponse {
  commitHash: string;
}

export async function getLatestCommitHash(domain: string, branch: string, token: string): Promise<string | null> {
  const branchName: string = encodeBranchName(branch);
  return axiosWithEnhancedError({
    headers: {
      ...getAuthHeaders(token),
      ...getUserAgentHeaders(),
    } as unknown as AxiosRequestHeaders,
    method: 'get',
    responseType: 'json',
    url: `${domain}/code/v/1.0/branch/${branchName}/latestCommit`,
  }).then((response: AxiosResponse) => (response.data as LatestCommitResponse).commitHash || null);
}
