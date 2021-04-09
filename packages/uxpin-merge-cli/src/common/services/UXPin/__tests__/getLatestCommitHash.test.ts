import axios, { AxiosStatic } from 'axios';
import { getLatestCommitHash } from '../getLatestCommitHash';

jest.mock('axios');
const axiosMock:jest.Mock<AxiosStatic> = axios as unknown as jest.Mock<AxiosStatic>;

describe('getLatestCommitHash', () => {
  const domain:string = 'https://uxpin.mock';
  const branch:string = 'master';
  const token:string = 'token';

  beforeEach(() => {
    axiosMock.mockRestore();
  });

  describe('request on master branch', () => {
    beforeEach(async () => {
      // given
      axiosMock.mockImplementation(() => Promise.resolve({ data: { commitHash: 'abc123' } }));

      // when
      await getLatestCommitHash(domain, branch, token);
    });

    it('should call proper url', () => {
      const [options] = axiosMock.mock.calls[0];
      console.log(options);
      expect(options.url).toEqual('https://uxpin.mock/code/v/1.0/branch/master/latestCommit');
    });

    it('should use proper HTTP method', () => {
      const [options] = axiosMock.mock.calls[0];
      expect(options.method).toEqual('GET');
    });

    it('should use proper auth-token', () => {
      const [options] = axiosMock.mock.calls[0];
      expect(options.headers['auth-token']).toEqual('token');
    });

    it('should have User-Agent header', () => {
      const [options] = axiosMock.mock.calls[0];
      expect(options.headers['User-Agent']).toContain('uxpin-merge-cli');
    });
  });

  describe('request on a branch with name containing a slash character', () => {
    beforeEach(async () => {
      // given
      const branchName:string = 'pull/27';
      axiosMock.mockImplementation(() => Promise.resolve({ data: { commitHash: 'abc123' } }));

      // when
      await getLatestCommitHash(domain, branchName, token);
    });

    it('should call proper url', () => {
      const [options] = axiosMock.mock.calls[0];
      expect(options.url).toEqual('https://uxpin.mock/code/v/1.0/branch/pull:2F27/latestCommit');
    });
  });

  describe('HTTP 200', () => {
    it('should return commitHash', async () => {
      // given
      axiosMock.mockImplementation(() => Promise.resolve({ data: { commitHash: 'abc123' } }));

      // when
      const commitHash:string | null = await getLatestCommitHash(domain, branch, token);

      // then
      expect(commitHash).toEqual('abc123');
    });

    it('should return null if commitHash is not available', async () => {
      // given
      axiosMock.mockImplementation(() => Promise.resolve({ data: {} }));

      // when
      const commitHash:string | null = await getLatestCommitHash(domain, branch, token);

      // then
      expect(commitHash).toEqual(null);
    });
  });

  describe('HTTP 401', () => {
    beforeEach(() => {
      axiosMock.mockImplementation(() => {
        return Promise.reject({response: {data: {
          error: 'Unauthorized',
          message: 'Incorrect authorization token',
          statusCode: 401,
        }}});
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
