import { OK } from 'http-status-codes';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

describe('uxpinDomainParam', () => {

  const { request } = setupExperimentationServerTest({
    projectPath: './',
    serverCmdArgs: ['--uxpin-domain="merge.uxpin.cloud"'],
  });

  describe('when --uxpin-domain set while running the experimentation mode', () => {
    it('responds headers containing the correct domain', async () => {
      // given
      const options:RequestPromiseOptions = { method: 'POST', resolveWithFullResponse: true };
      const expectedHeaders:any = {
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'Access-Control-Allow-Origin': 'https://app.merge.uxpin.cloud',
      };

      // when
      const response:Response = await request('/ajax/dmsDPPage/Save/?__ajax_request=1', options);

      // then
      expect(response.statusCode).toEqual(OK);
      expect(response.body).toEqual('');
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });
  });
});
