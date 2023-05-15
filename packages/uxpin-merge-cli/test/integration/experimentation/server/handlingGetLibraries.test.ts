import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { OK } from 'http-status-codes';
import { LIBRARY_DEFAULT_NAME } from '../../../../src/steps/experimentation/server/handler/libraries/GetLibrariesHandler';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 20_000;

describe('handlingGetLibraries', () => {
  const { axiosPromise } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/withEpidFile',
    timeout: CURRENT_TIMEOUT,
  });

  describe('should serve library bundle', () => {
    let response: AxiosResponse;
    beforeAll(async () => {
      // given
      const origin = 'https://app.uxpin.com';
      const options: AxiosRequestConfig = { method: 'GET', headers: { origin } };

      // when
      response = await axiosPromise('/libraries/', options);
    }, CURRENT_TIMEOUT);

    it('with correct response headers', () => {
      // given
      const expectedHeaders: any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.uxpin.com',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
      };

      // then
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });

    it('with correct status code', () => {
      expect(response.status).toEqual(OK);
    });

    it('should server libraries content', async () => {
      const expectedLibrary: any = {
        _links: {
          categories: {
            href: '/code/categories',
            templated: false,
          },
          info: {
            href: '/code/info',
            templated: false,
          },
          items: {
            href: '/code/previews',
            templated: false,
          },
          pointer: {
            href: '/code/repositoryPointer',
            templated: false,
          },
        },
        accessScope: {
          scopeGroup: 'account',
          selectedUsers: [],
        },
        editScope: {
          scopeGroup: 'account',
          selectedUsers: [],
        },
        hasDesignSystem: false,
        hash: expect.any(String),
        id: -1,
        idAccount: -1,
        idClient: null,
        idUser: -1,
        insertDate: expect.any(String),
        lastSketchSyncDate: null,
        name: LIBRARY_DEFAULT_NAME,
        type: 'code-sync',
      };

      expect(response.data).toEqual([expectedLibrary]);
    });
  });
});
