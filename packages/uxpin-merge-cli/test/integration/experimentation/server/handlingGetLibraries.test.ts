import { OK } from 'http-status-codes';
import * as path from 'path';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { LIBRARY_DEFAULT_NAME } from '../../../../src/steps/experimentation/server/handler/libraries/GetLibrariesHandler';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

describe('handlingGetLibraries', () => {
  const { request } = setupExperimentationServerTest({
    projectPath: path.resolve(__dirname, '../../../resources/designSystems/withEpidFile'),
  });

  describe('should serve library bundle', () => {
    let response:Response;
    beforeAll(async () => {
      // given
      const options:RequestPromiseOptions = { method: 'GET', resolveWithFullResponse: true };

      // when
      response = await request('/libraries/', options);
    });

    it('with correct response headers', () => {
      // given
      const expectedHeaders:any = {
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
      expect(response.statusCode).toEqual(OK);
    });

    it('should server libraries content', async () => {
      const expectedLibrary:any = {
        _links: {
          categories: {
            href: '/code/categories',
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

      expect(JSON.parse(response.body)).toEqual([expectedLibrary]);
    });
  });
});
