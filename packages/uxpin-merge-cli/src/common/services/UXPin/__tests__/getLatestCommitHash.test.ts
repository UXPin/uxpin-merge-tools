import axios, { AxiosRequestConfig } from 'axios';
import { getLatestCommitHash } from '../getLatestCommitHash';

jest.mock('axios');
const axiosMock = axios as jest.MockedFunction<typeof axios>;

describe('getLatestCommitHash', () => {
  const domain = 'https://uxpin.mock';
  const branch = 'master';
  const token = 'token';

  beforeEach(() => {
    axiosMock.mockRestore();
  });

  describe('request on master branch', () => {
    beforeEach(async () => {
      // given
      axiosMock.mockResolvedValue({ data: { commitHash: 'abc123' } });

      // when
      await getLatestCommitHash(domain, branch, token);
    });

    it('should call proper url', () => {
      const [options] = axiosMock.mock.calls[0];
      expect((options as AxiosRequestConfig).url).toEqual('https://uxpin.mock/code/v/1.0/branch/master/latestCommit');
    });

    it('should use proper HTTP method', () => {
      const [options] = axiosMock.mock.calls[0];
      expect((options as AxiosRequestConfig).method).toEqual('get');
    });

    it('should use proper auth-token', () => {
      const [options] = axiosMock.mock.calls[0];
      expect((options as AxiosRequestConfig).headers!['auth-token']).toEqual('token');
    });

    it('should have User-Agent header', () => {
      const [options] = axiosMock.mock.calls[0];
      expect((options as AxiosRequestConfig).headers!['User-Agent']).toContain('uxpin-merge-cli');
    });
  });

  describe('request on a branch with name containing a slash character', () => {
    beforeEach(async () => {
      // given
      const branchName = 'pull/27';
      axiosMock.mockResolvedValue({ data: { commitHash: 'abc123' } });

      // when
      await getLatestCommitHash(domain, branchName, token);
    });

    it('should call proper url', () => {
      const [options] = axiosMock.mock.calls[0];
      expect((options as AxiosRequestConfig).url).toEqual(
        'https://uxpin.mock/code/v/1.0/branch/pull:2F27/latestCommit'
      );
    });
  });

  describe('HTTP 200', () => {
    it('should return commitHash', async () => {
      // given
      axiosMock.mockResolvedValue({ data: { commitHash: 'abc123' } });

      // when
      const commitHash: string | null = await getLatestCommitHash(domain, branch, token);

      // then
      expect(commitHash).toEqual('abc123');
    });

    it('should return null if commitHash is not available', async () => {
      // given
      axiosMock.mockResolvedValue({ data: {} });

      // when
      const commitHash: string | null = await getLatestCommitHash(domain, branch, token);

      // then
      expect(commitHash).toEqual(null);
    });
  });

  describe('HTTP 401', () => {
    beforeEach(() => {
      axiosMock.mockRejectedValue({
        response: {
          data: {
            error: 'Unauthorized',
            message: 'Incorrect authorization token',
            statusCode: 401,
          },
        },
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
