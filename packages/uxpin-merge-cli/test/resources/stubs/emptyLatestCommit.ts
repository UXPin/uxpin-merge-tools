import { StubbyStub } from 'stubby';
import { getStubGetLatestCommitRequest } from './common/getStubGetLatestCommitRequest';

export const emptyLatestCommitStub:StubbyStub[] = [
  getStubGetLatestCommitRequest(),
];
