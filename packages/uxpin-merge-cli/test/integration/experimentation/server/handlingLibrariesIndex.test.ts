import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { OK } from 'http-status-codes';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 300000;

describe('Experimentation server - handling libraries index', () => {
  let response: AxiosResponse;
  const { axiosPromise } = setupExperimentationServerTest({
    timeout: CURRENT_TIMEOUT,
  });

  beforeAll(async () => {
    // given
    const origin = 'https://app.uxpin.com';
    const options: AxiosRequestConfig = { method: 'GET', headers: { origin } };

    // when
    response = await axiosPromise('/libraries/items/index/', options);
  }, CURRENT_TIMEOUT);

  it('should responds with OK status code', async () => {
    expect(response.status).toEqual(OK);
  });

  it('should responds with correct CORS headers', async () => {
    // given
    const expectedHeaders: any = {
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'access-control-allow-origin': 'https://app.uxpin.com',
    };

    // then
    expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
  });

  it('should respond with empty array', () => {
    expect(response.data).toEqual([]);
  });
});
