import { NO_CONTENT, OK } from 'http-status-codes';
import { StubbyStub } from 'stubby';

export function getStubGetLatestCommitRequest(commitHash:string|null = null):StubbyStub {
  return {
    request: {
      method: 'GET',
      url: /^\/code\/v\/1\.0\/branch\/[A-Za-z0-9\-\_]+\/latestCommit$/,
    },
    response: {
      body: commitHash === null ? '' : `{"commitHash":"${commitHash}"}`,
      headers: {
        'content-type': 'application/json',
      },
      status: commitHash === null ? NO_CONTENT : OK,
    },
  };
}
