import { resolve } from 'path';
import { postUploadBundle, UploadBundleResponse } from '../postUploadBundle';

describe('postUploadBundle', () => {
  const domain:string = 'https://uxpin.mock';
  const token:string = 'token';
  const path:string = resolve(__dirname, './postUploadBundle.test.ts');
  const commitHash:string = '123abc';

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe('request', () => {
    beforeEach(async () => {
      // given
      fetchMock.mockResponseOnce(JSON.stringify({ url: 'https://s3.mock/bundle.js' }));

      // when
      await postUploadBundle(domain, token, commitHash, path);
    });

    it('should call proper url', () => {
      const [url] = fetchMock.mock.calls[0];
      expect(url).toEqual('https://uxpin.mock/code/v/1.0/push/bundle');
    });

    it('should use proper HTTP method', () => {
      const [, options] = fetchMock.mock.calls[0];
      expect(options.method).toEqual('POST');
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
    let response:UploadBundleResponse|null;

    beforeEach(async () => {
      // given
      fetchMock.mockResponseOnce(JSON.stringify({ url: 'https://s3.mock/bundle.js' }));

      // when
      response = await postUploadBundle(domain, token, commitHash, path);
    });

    it('should return valid response', () => {
      expect(response!.url).toEqual('https://s3.mock/bundle.js');
    });
  });

  describe.skip('HTTP 401', () => {
    beforeEach(async () => {
      // given
      fetchMock.mockResponseOnce(() => {
        return Promise.reject({
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
        await postUploadBundle(domain, token, commitHash, path);
      } catch (error) {
        expect(error.message).toContain('Incorrect authorization token');
      }
    });
  });
});
