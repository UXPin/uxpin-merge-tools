import * as requestPromise from 'request-promise';
import { getLatestCommitHash } from '../getLatestCommitHash';

jest.mock('request-promise');

const requestPromiseMock: jest.Mock<typeof requestPromise> = requestPromise as unknown as jest.Mock<
  typeof requestPromise
>;

describe('getLatestCommitHash', () => {
  const domain = 'https://uxpin.mock';
  const branch = 'master';
  const token = 'token';

  beforeEach(() => {
    requestPromiseMock.mockRestore();
  });

  describe('request on master branch', () => {
    beforeEach(async () => {
      // given
      requestPromiseMock.mockImplementation(() => Promise.resolve({ commitHash: 'abc123' }));

      // when
      await getLatestCommitHash(domain, branch, token);
    });

    it('should call proper url', () => {
      const [url] = requestPromiseMock.mock.calls[0];
      expect(url).toEqual('https://uxpin.mock/code/v/1.0/branch/master/latestCommit');
    });

    it('should use proper HTTP method', () => {
      const [, options] = requestPromiseMock.mock.calls[0];
      expect(options.method).toEqual('GET');
    });

    it('should use proper auth-token', () => {
      const [, options] = requestPromiseMock.mock.calls[0];
      expect(options.headers['auth-token']).toEqual('token');
    });

    it('should have User-Agent header', () => {
      const [, options] = requestPromiseMock.mock.calls[0];
      expect(options.headers['User-Agent']).toContain('uxpin-merge-cli');
    });
  });

  describe('request on a branch with name containing a slash character', () => {
    beforeEach(async () => {
      // given
      const branchName = 'pull/27';
      requestPromiseMock.mockImplementation(() => Promise.resolve({ commitHash: 'abc123' }));

      // when
      await getLatestCommitHash(domain, branchName, token);
    });

    it('should call proper url', () => {
      const [url] = requestPromiseMock.mock.calls[0];
      expect(url).toEqual('https://uxpin.mock/code/v/1.0/branch/pull:2F27/latestCommit');
    });
  });

  describe('HTTP 200', () => {
    it('should return commitHash', async () => {
      // given
      requestPromiseMock.mockImplementation(() => Promise.resolve({ commitHash: 'abc123' }));

      // when
      const commitHash: string | null = await getLatestCommitHash(domain, branch, token);

      // then
      expect(commitHash).toEqual('abc123');
    });

    it('should return null if commitHash is not available', async () => {
      // given
      requestPromiseMock.mockImplementation(() => Promise.resolve(undefined));

      // when
      const commitHash: string | null = await getLatestCommitHash(domain, branch, token);

      // then
      expect(commitHash).toEqual(null);
    });
  });

  describe('HTTP 401', () => {
    beforeEach(() => {
      requestPromiseMock.mockImplementation(() => {
        return Promise.reject({
          error: {
            error: 'Unauthorized',
            message: 'Incorrect authorization token',
            statusCode: 401,
          },
        });
      });
    });

    it('should reject on error', async () => {
      try {
        await getLatestCommitHash(domain, branch, token);
      } catch (error) {
        expect(error).toEqual({
          error: 'Unauthorized',
          message: 'Incorrect authorization token',
          statusCode: 401,
          url: 'https://uxpin.mock/code/v/1.0/branch/master/latestCommit',
        });
      }
    });
  });
});
