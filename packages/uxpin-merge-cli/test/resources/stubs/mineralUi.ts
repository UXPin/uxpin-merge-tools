import { StubbyStub } from 'stubby';
import { getStubGetLatestCommitRequest } from './common/getStubGetLatestCommitRequest';

export const mineralUiSummaryStub: StubbyStub[] = [
  getStubGetLatestCommitRequest('6a18faefe3d8339b066c92f1a10b27872f15729b'),
];

export const mineralUiServerStub: StubbyStub[] = [...mineralUiSummaryStub];
