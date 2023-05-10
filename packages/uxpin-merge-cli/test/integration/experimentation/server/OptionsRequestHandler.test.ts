import { OK } from 'http-status-codes';
import { Response } from 'request';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { using } from '../../../utils/using';

const CURRENT_TIMEOUT = 300000;

describe('OptionsRequestHandler', () => {
  const { request } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/twoComponentsWithConfig',
    serverCmdArgs: ['--webpack-config "./webpack.config.js"'],
    timeout: CURRENT_TIMEOUT,
  });

  const getEndpoints: string[] = [
    '/libraries/',
    '/libraries/items/index/',
    '/code/repositoryPointer',
    '/code/repositoryPointer/default',
    '/code/categories',
    '/code/previews',
  ];

  using(getEndpoints).describe('responds to OPTIONS (preflight) request for', (uri) => {
    it(`${uri} endpoint with correct headers`, async () => {
      // given
      const origin = 'https://app.uxpin.com';
      const expectedHeaders: any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.uxpin.com',
      };

      // when
      const response: Response = await request(uri, {
        headers: { origin },
        method: 'OPTIONS',
        resolveWithFullResponse: true,
      });

      // then
      expect(response.statusCode).toEqual(OK);
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
      expect(response.body).toEqual('');
    });
  });
});
