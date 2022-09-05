import { StubbyStub } from 'stubby';
import { getStubGetLatestCommitRequest } from './common/getStubGetLatestCommitRequest';

export const nonExistingLatestCommitStub: StubbyStub[] = [getStubGetLatestCommitRequest('nonexistinglatestcommithash')];
