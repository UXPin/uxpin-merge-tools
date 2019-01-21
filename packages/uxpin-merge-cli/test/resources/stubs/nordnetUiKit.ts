export const nordnetUiKitSummaryStub:any = {
  requests: [
    {
      request: {
        method: 'GET',
        url: /^\/code\/v\/1\.0\/branch\/[A-Za-z0-9\-\_]+\/latestCommit$/,
      },
      response: {
        body: '{"commitHash":"d914edd5f97cadb284f7f47b783106c86fe430d9"}',
        headers: {
          'content-type': 'application/json',
        },
        status: 200,
      },
    },
  ],
};
