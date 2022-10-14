import * as requestPromise from 'request-promise';
import { DSMetadata } from '../../../../program/DSMeta';
import { postPushMetadata, PushMetadataResponse } from '../postPushMetadata';

jest.mock('request-promise');

const requestPromiseMock: jest.Mock<typeof requestPromise> = requestPromise as unknown as jest.Mock<
  typeof requestPromise
>;

describe('postPushMetadata', () => {
  const domain = 'https://uxpin.mock';
  const token = 'token';
  const metadata: DSMetadata = {
    result: {
      categorizedComponents: [],
      name: 'Library name',
      vcs: {
        branchName: 'master',
        commitHash: '123abc',
      },
    },
    warnings: [],
  };

  beforeEach(() => {
    requestPromiseMock.mockRestore();
  });

  describe('request', () => {
    beforeEach(async () => {
      // given
      requestPromiseMock.mockImplementation(() => Promise.resolve({}));

      // when
      await postPushMetadata(domain, token, metadata);
    });

    it('should call proper url', () => {
      const [url] = requestPromiseMock.mock.calls[0];
      expect(url).toEqual('https://uxpin.mock/code/v/1.0/push');
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
    let response: PushMetadataResponse | null;

    beforeEach(async () => {
      // given
      requestPromiseMock.mockImplementation(() =>
        Promise.resolve({
          message: 'Design System snapshot has been uploaded successfully',
        })
      );

      // when
      response = await postPushMetadata(domain, token, metadata);
    });

    it('should return valid response', () => {
      expect(response!.message).toContain('successfully');
    });
  });

  describe('HTTP 401', () => {
    beforeEach(() => {
      // given
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
        await postPushMetadata(domain, token, metadata);
      } catch (error) {
        expect(error).toEqual({
          error: 'Unauthorized',
          message: 'Incorrect authorization token',
          statusCode: 401,
          url: 'https://uxpin.mock/code/v/1.0/push',
        });
      }
    });
  });
});
