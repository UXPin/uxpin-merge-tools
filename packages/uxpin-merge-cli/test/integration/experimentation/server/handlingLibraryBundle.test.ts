import { OK } from 'http-status-codes';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimental server - serving library bundle', () => {
  const { request } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/twoComponentsWithConfig',
    serverCmdArgs: ['--webpack-config "./webpack.config.js"'],
  });

  describe('should serve library bundle', () => {
    let response:Response;
    beforeAll(async () => {
      // given
      const options:RequestPromiseOptions = { method: 'GET', resolveWithFullResponse: true };

      // when
      response = await request('/code/library.js', options);
    });

    it('with correct status code', () => {
      expect(response.statusCode).toEqual(OK);
    });

    it('with correct response headers', () => {
      // given
      const expectedHeaders:any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.uxpin.com',
        'cache-control': 'no-cache',
        'content-type': 'application/javascript',
      };

      // then
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });

    it('with not empty response', () => {
      expect(response.body).toBeDefined();
    });
  });
});
