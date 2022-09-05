import { StubbyStub } from 'stubby';
import { getStubGetLatestCommitRequest } from './common/getStubGetLatestCommitRequest';
import { getStubUploadBundle } from './common/getStubUploadBundle';
import { getStubUploadMetadata } from './common/getStubUploadMetadata';

export const emptyLatestCommitStub: StubbyStub[] = [
  getStubGetLatestCommitRequest(),
  getStubUploadBundle(),
  getStubUploadMetadata(),
];
