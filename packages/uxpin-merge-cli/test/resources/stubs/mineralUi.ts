import { getLatestCommit } from './common/getLatestCommit';

export const mineralUiSummaryStub:any = {
  requests: [
    getLatestCommit('b825842aeb4244e56977af1a4afc3559caed94f3'),
  ],
};

export const mineralUiServerStub:any = mineralUiSummaryStub;
