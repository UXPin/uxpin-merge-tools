import { OK } from 'http-status-codes';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation server - handling libraries index', () => {
  let response:Response;
  const { request } = setupExperimentationServerTest();

  beforeAll(async () => {
    // given
    const origin:string = 'https://app.uxpin.com';
    const options:RequestPromiseOptions = { method: 'GET', resolveWithFullResponse: true, headers: { origin } };

    // when
    response = await request('/libraries/items/index/', options);
  });

  it('should responds with OK status code', async () => {
    expect(response.statusCode).toEqual(OK);
  });

  it('should responds with correct CORS headers', async () => {
    // given
    const expectedHeaders:any = {
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
