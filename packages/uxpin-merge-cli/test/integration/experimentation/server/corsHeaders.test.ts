import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { OK } from 'http-status-codes';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 30000;

describe('CORS Headers', () => {
  const { axiosPromise } = setupExperimentationServerTest({
    timeout: CURRENT_TIMEOUT,
  });

  describe('when `origin` header is set', () => {
    it('responds headers containing the correct domain', async () => {
      // given
      const origin = 'https://app.merge.uxpin.cloud';
      const options: AxiosRequestConfig = { headers: { origin }, method: 'GET' };
      const expectedHeaders: any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': 'https://app.merge.uxpin.cloud',
      };

      // when
      const response: AxiosResponse = await axiosPromise('/libraries/items/index/', options);

      // then
      expect(response.status).toEqual(OK);
      expect(response.data).toEqual([]);
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });
  });

  describe('when `origin` header is not set', () => {
    it('responds headers containing `*` wildcard', async () => {
      // given
      const options: AxiosRequestConfig = { method: 'GET' };
      const expectedHeaders: any = {
        'access-control-allow-credentials': 'true',
        'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
        'access-control-allow-origin': '*',
      };

      // when
      const response: AxiosResponse = await axiosPromise('/libraries/items/index/', options);

      // then
      expect(response.status).toEqual(OK);
      expect(response.data).toEqual([]);
      expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
    });
  });
});
