export const mineralUiSummaryStub:any = {
  requests: [
    {
      request: {
        method: 'GET',
        url: /^\/code\/v\/1\.0\/branch\/[A-Za-z0-9\-\_]+\/latestCommit$/,
      },
      response: {
        body: '{"commitHash":"b825842aeb4244e56977af1a4afc3559caed94f3"}',
        headers: {
          'content-type': 'application/json',
        },
        status: 200,
      },
    },
  ],
};
