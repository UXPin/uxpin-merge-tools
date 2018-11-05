import { OK } from 'http-status-codes';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('uxpin domain param', () => {
  const { request } = setupExperimentationServerTest({
    serverCmdArgs: ['--uxpin-domain="merge.uxpin.cloud"'],
  });

  describe('when --uxpin-domain set while running the experimentation mode', () => {
    it('responds headers containing the correct domain', async () => {
      // given
      const options:RequestPromiseOptions = { method: 'GET', resolveWithFullResponse: true };
      const expectedHeaders:any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.merge.uxpin.cloud',
      };

      // when
      const response:Response = await request('/libraries/items/index/', options);

      // then
      expect(response.statusCode).toEqual(OK);
      expect(response.body).toEqual('[]');
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });
  });
});
