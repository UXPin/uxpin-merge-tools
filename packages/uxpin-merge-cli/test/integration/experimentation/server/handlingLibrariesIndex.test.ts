import { OK } from 'http-status-codes';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 300000;

describe('Experimentation server - handling libraries index', () => {
  let response: Response;
  const { request } = setupExperimentationServerTest({
    timeout: CURRENT_TIMEOUT,
  });

  beforeAll(async () => {
    // given
    const origin = 'https://app.uxpin.com';
    const options: RequestPromiseOptions = { method: 'GET', resolveWithFullResponse: true, headers: { origin } };

    // when
    response = await request('/libraries/items/index/', options);
  }, CURRENT_TIMEOUT);

  it('should responds with OK status code', async () => {
    expect(response.statusCode).toEqual(OK);
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
    expect(response.body).toEqual('[]');
  });
});
