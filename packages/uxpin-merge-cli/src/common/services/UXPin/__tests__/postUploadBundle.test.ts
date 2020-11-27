import { resolve } from 'path';
import * as requestPromise from 'request-promise';
import { postUploadBundle, UploadBundleResponse } from '../postUploadBundle';

jest.mock('request-promise');

const requestPromiseMock:jest.Mock<typeof requestPromise> =
  requestPromise as unknown as jest.Mock<typeof requestPromise>;

describe('postUploadBundle', () => {
  const domain:string = 'https://uxpin.mock';
  const token:string = 'token';
  const path:string = resolve(__dirname, './postUploadBundle.test.ts');
  const commitHash:string = '123abc';

  beforeEach(() => {
    requestPromiseMock.mockRestore();
  });

  describe('request', () => {
    beforeEach(async () => {
      // given
      // @ts-ignore
      requestPromiseMock.mockImplementation(() => Promise.resolve({ url: 'https://s3.mock/bundle.js' }));

      // when
      await postUploadBundle(domain, token, commitHash, path);
    });

    it('should call proper url', () => {
      const [url] = requestPromiseMock.mock.calls[0];
      expect(url).toEqual('https://uxpin.mock/code/v/1.0/push/bundle');
    });

    it('should use proper HTTP method', () => {
      const [, options] = requestPromiseMock.mock.calls[0];
      expect(options.method).toEqual('POST');
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

  describe('HTTP 200', () => {
    let response:UploadBundleResponse|null;

    beforeEach(async () => {
      // given
      // @ts-ignore
      requestPromiseMock.mockImplementation(() => Promise.resolve({ url: 'https://s3.mock/bundle.js' }));

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
      // @ts-ignore
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
