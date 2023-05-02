import axios, { AxiosRequestConfig } from 'axios';
import { resolve } from 'path';
import { postUploadBundle, UploadBundleResponse } from '../postUploadBundle';

jest.mock('axios');
const axiosMock = axios as jest.MockedFunction<typeof axios>;

describe('postUploadBundle', () => {
  const domain = 'https://uxpin.mock';
  const token = 'token';
  const path = resolve(__dirname, './postUploadBundle.test.ts');
  const commitHash = '123abc';

  beforeEach(() => {
    axiosMock.mockRestore();
  });

  describe('request', () => {
    beforeEach(async () => {
      // given
      axiosMock.mockImplementation(() => Promise.resolve({ data: { url: 'https://s3.mock/bundle.js' } }));

      // when
      await postUploadBundle(domain, token, commitHash, path);
    });

    it('should call proper url', () => {
      const [options] = axiosMock.mock.calls[0];
      expect((options as AxiosRequestConfig).url).toEqual('https://uxpin.mock/code/v/1.0/push/bundle');
    });

    it('should use proper HTTP method', () => {
      const [options] = axiosMock.mock.calls[0];
      expect((options as AxiosRequestConfig).method).toEqual('POST');
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

  describe('HTTP 200', () => {
    let response: UploadBundleResponse | null;

    beforeEach(async () => {
      // given
      axiosMock.mockImplementation(() => Promise.resolve({ data: { url: 'https://s3.mock/bundle.js' } }));

      // when
      response = await postUploadBundle(domain, token, commitHash, path);
    });

    it('should return valid response', () => {
      expect(response!.url).toEqual('https://s3.mock/bundle.js');
    });
  });

  describe('HTTP 401', () => {
    beforeEach(async () => {
      // given
      axiosMock.mockImplementation(() => {
        return Promise.reject({
          response: {
            data: {
              error: 'Unauthorized',
              message: 'Incorrect authorization token',
              statusCode: 401,
            },
          },
        });
      });
    });

    it('should reject on error', async () => {
      try {
        await postUploadBundle(domain, token, commitHash, path);
      } catch (error) {
        expect(error).toEqual({
          error: 'Unauthorized',
          message: 'Incorrect authorization token',
          statusCode: 401,
          url: 'https://uxpin.mock/code/v/1.0/push/bundle',
        });
      }
    });
  });
});
