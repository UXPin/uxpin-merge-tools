import { OK } from 'http-status-codes';
import { Response } from 'request';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation mode - handling categories', () => {
  let response: Response;
  const { request } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/twoComponentsWithConfig',
    serverCmdArgs: ['--webpack-config "./webpack.config.js"'],
  });

  beforeAll(async () => {
    const origin = 'https://app.uxpin.com';
    response = await request('/code/categories', { resolveWithFullResponse: true, headers: { origin } });
  });

  it('should responds with OK status code', async () => {
    expect(response.statusCode).toEqual(OK);
  });

  it('should responds with correct CORS headers and no-cache', async () => {
    // given
    const expectedHeaders: any = {
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
    expect(JSON.parse(response.body)).toMatchSnapshot();
  });
});
