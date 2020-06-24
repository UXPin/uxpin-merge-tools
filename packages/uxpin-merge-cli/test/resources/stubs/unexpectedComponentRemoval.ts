import { StubbyStub } from 'stubby';
import { getStubGetLatestCommitRequest } from './common/getStubGetLatestCommitRequest';
import { getStubUploadBundle } from './common/getStubUploadBundle';
import { getStubUploadMetadataUnexpectedRemovalError } from './common/getStubUploadMetadataUnexpectedRemovalError';

export const unexpectedComponentRemoval:StubbyStub[] = [
  getStubGetLatestCommitRequest(),
  getStubUploadBundle(),
  getStubUploadMetadataUnexpectedRemovalError(),
];
