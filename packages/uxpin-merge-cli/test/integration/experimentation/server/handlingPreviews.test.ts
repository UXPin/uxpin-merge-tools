import { AxiosResponse } from 'axios';
import { OK } from 'http-status-codes';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 300000;

describe('Experimentation mode - handling previews', () => {
  let response: AxiosResponse;
  const { axiosPromise } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/twoComponentsWithConfig',
    serverCmdArgs: ['--webpack-config "./webpack.config.js"'],
    timeout: CURRENT_TIMEOUT,
  });

  beforeAll(async () => {
    const origin = 'https://app.uxpin.com';
    response = await axiosPromise('/code/previews', { headers: { origin } });
  }, CURRENT_TIMEOUT);

  it('should responds with OK status code', async () => {
    expect(response.status).toEqual(OK);
  });

  it('should responds with correct CORS headers and no-cache', async () => {
    // given
    const expectedHeaders = {
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
    expect(response.data).toMatchSnapshot();
  });
});
