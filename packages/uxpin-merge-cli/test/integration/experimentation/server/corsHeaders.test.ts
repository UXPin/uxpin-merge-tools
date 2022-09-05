import { OK } from 'http-status-codes';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('CORS Headers', () => {
  const { request } = setupExperimentationServerTest();

  describe('when `origin` header is set', () => {
    it('responds headers containing the correct domain', async () => {
      // given
      const origin = 'https://app.merge.uxpin.cloud';
      const options: RequestPromiseOptions = { headers: { origin }, method: 'GET', resolveWithFullResponse: true };
      const expectedHeaders: any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.merge.uxpin.cloud',
      };

      // when
      const response: Response = await request('/libraries/items/index/', options);

      // then
      expect(response.statusCode).toEqual(OK);
      expect(response.body).toEqual('[]');
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });
  });

  describe('when `origin` header is not set', () => {
    it('responds headers containing `*` wildcard', async () => {
      // given
      const options: RequestPromiseOptions = { method: 'GET', resolveWithFullResponse: true };
      const expectedHeaders: any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': '*',
      };

      // when
      const response: Response = await request('/libraries/items/index/', options);

      // then
      expect(response.statusCode).toEqual(OK);
      expect(response.body).toEqual('[]');
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });
  });
});
