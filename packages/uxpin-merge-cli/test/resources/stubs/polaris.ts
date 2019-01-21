export const polarisSummaryStub:any = {
  requests: [
    {
      request: {
        method: 'GET',
        url: /^\/code\/v\/1\.0\/branch\/[A-Za-z0-9\-\_]+\/latestCommit$/,
      },
      response: {
        body: '{"commitHash":"adf58fa0faa9aab994a8e9379f8b78da9da9719b"}',
        headers: {
          'content-type': 'application/json',
        },
        status: 200,
      },
    },
  ],
};
