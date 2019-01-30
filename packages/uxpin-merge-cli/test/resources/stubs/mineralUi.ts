import { getLatestCommit } from './common/getLatestCommit';

export const mineralUiSummaryStub:any = {
  requests: [
    getLatestCommit('6a18faefe3d8339b066c92f1a10b27872f15729b'),
  ],
};

export const mineralUiServerStub:any = mineralUiSummaryStub;
