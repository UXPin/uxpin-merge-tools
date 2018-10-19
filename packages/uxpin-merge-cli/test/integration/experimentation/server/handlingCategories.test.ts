import { OK } from 'http-status-codes';
import * as path from 'path';
import { Response } from 'request';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe.skip('Experimentation mode - handling categories', () => {
  let response:Response;
  const { request } = setupExperimentationServerTest({
    projectPath: path.resolve(__dirname, '../../../resources/designSystems/twoComponentsWithConfig'),
  });

  beforeAll(async () => {
    response = await request('/code/categories', { resolveWithFullResponse: true });
  });

  it('should responds with OK status code', async () => {
    expect(response.statusCode).toEqual(OK);
  });

  it('should responds with correct CORS headers and no-cache', async () => {
    // given
    const expectedHeaders:any = {
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'access-control-allow-origin': 'https://app.uxpin.com',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
    };

    // then
    expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
  });

  it('should respond with proper body', () => {
    expect(response.body).toMatchSnapshot();
  });
});
