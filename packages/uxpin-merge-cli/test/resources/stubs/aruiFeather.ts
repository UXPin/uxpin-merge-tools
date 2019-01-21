export const aruiFeatherSummaryStub:any = {
  requests: [
    {
      request: {
        method: 'GET',
        url: /^\/code\/v\/1\.0\/branch\/[A-Za-z0-9\-\_]+\/latestCommit$/,
      },
      response: {
        body: '{"commitHash":"14546410449fdaa2014d3f32cf404291cca41c50"}',
        headers: {
          'content-type': 'application/json',
        },
        status: 200,
      },
    },
  ],
};
