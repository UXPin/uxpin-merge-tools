import axios, { AxiosStatic } from 'axios';
import { DSMetadata } from '../../../../program/DSMeta';
import { postPushMetadata, PushMetadataResponse } from '../postPushMetadata';

jest.mock('axios');
const axiosMock:jest.Mock<AxiosStatic> = axios as unknown as jest.Mock<AxiosStatic>;

describe('postPushMetadata', () => {
  const domain:string = 'https://uxpin.mock';
  const token:string = 'token';
  const metadata:DSMetadata = {
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
    axiosMock.mockRestore();
  });

  describe('request', () => {
    beforeEach(async () => {
      // given
      axiosMock.mockImplementation(() => Promise.resolve({}));

      // when
      await postPushMetadata(domain, token, metadata);
    });

    it('should call proper url', () => {
      const [options] = axiosMock.mock.calls[0];
      expect(options.url).toEqual('https://uxpin.mock/code/v/1.0/push');
    });

    it('should use proper HTTP method', () => {
      const [options] = axiosMock.mock.calls[0];
      expect(options.method).toEqual('POST');
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

  describe('HTTP 200', () => {
    let response:PushMetadataResponse | null;

    beforeEach(async () => {
      // given
      axiosMock.mockImplementation(() => Promise.resolve({data: {
        message: 'Design System snapshot has been uploaded successfully',
      }}));

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
      axiosMock.mockImplementation(() => {
        return Promise.reject({response: {data: {
          error: 'Unauthorized',
          message: 'Incorrect authorization token',
          statusCode: 401,
        },
        }});
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
