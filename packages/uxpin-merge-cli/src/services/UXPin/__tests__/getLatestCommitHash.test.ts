import { getLatestCommitHash } from '../getLatestCommitHash';

describe('getLatestCommitHash', () => {
  const domain:string = 'https://uxpin.mock';
  const branch:string = 'master';
  const token:string = 'token';

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('request', () => {
    beforeEach(async () => {
      // given
      fetchMock.mockResponseOnce(JSON.stringify({ commitHash: 'abc123' }));

      // when
      await getLatestCommitHash(domain, branch, token);
    });

    it('should call proper url', () => {
      const [url] = fetchMock.mock.calls[0];
      expect(url).toEqual('https://uxpin.mock/code/v/1.0/branch/master/latestCommit');
    });

    it('should use proper HTTP method', () => {
      const [, options] = fetchMock.mock.calls[0];
      expect(options.method).toEqual('GET');
    });

    it('should use proper auth-token', () => {
      const [, options] = fetchMock.mock.calls[0];
      expect(options.headers['auth-token']).toEqual('token');
    });

    it('should have User-Agent header', () => {
      const [, options] = fetchMock.mock.calls[0];
      expect(options.headers['User-Agent']).not.toEqual('');
    });
  });

  describe('HTTP 200', () => {
    it('should return commitHash', async () => {
      // given
      fetchMock.mockResponseOnce(JSON.stringify({ commitHash: 'abc123' }));

      // when
      const commitHash:string|null = await getLatestCommitHash(domain, branch, token);

      // then
      expect(commitHash).toEqual('abc123');
    });

    it('should return null if commitHash is not available', () => {
      // given
      fetchMock.mockResponseOnce(JSON.stringify({}));
    });
  });

  describe('HTTP 401', () => {
    beforeEach(() => {
      fetchMock.mockResponseOnce(() => {
        return Promise.resolve({
          body: JSON.stringify({
            error: 'Unauthorized',
            message: 'Incorrect authorization token',
            statusCode: 401,
          }),
          init: {
            status: 401,
          },
        });
      });
    });

    it('should reject on error', async () => {
      try {
        await getLatestCommitHash(domain, branch, token);
      } catch (error) {
        expect(error.message).toContain('Incorrect authorization token');
      }
    });
  });

  describe('HTTP 204', () => {
    beforeEach(() => {
      fetchMock.mockResponseOnce(() => {
        return Promise.resolve({
          body: '',
          init: {
            status: 204,
          },
        });
      });
    });

    it('should return null on empty content', async () => {
      // when
      const commitHash:string|null = await getLatestCommitHash(domain, branch, token);

      // then
      expect(commitHash).toEqual(null);
    });
  });
});
