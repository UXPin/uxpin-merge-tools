import { OK } from 'http-status-codes';
import { resolve } from 'path';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('uxpinDomainParam', () => {
  const { request } = setupExperimentationServerTest({
    projectPath: resolve(__dirname, '../../../resources/designSystems/noSrcDir'),
    serverCmdArgs: ['--uxpin-domain="merge.uxpin.cloud"'],
    useTempDir: true,
  });

  describe('when --uxpin-domain set while running the experimentation mode', () => {
    it('responds headers containing the correct domain', async () => {
      // given
      const options:RequestPromiseOptions = { method: 'POST', resolveWithFullResponse: true };
      const expectedHeaders:any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.merge.uxpin.cloud',
      };

      // when
      const response:Response = await request('/ajax/dmsDPPage/Save/?__ajax_request=1', options);

      // then
      expect(response.statusCode).toEqual(OK);
      expect(response.body).toEqual('{}');
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });
  });
});
