import { AxiosResponse } from 'axios';
import { OK } from 'http-status-codes';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation mode - handling categories', () => {
  let response:AxiosResponse;
  const { axiosPromise } = setupExperimentationServerTest({
    projectPath: 'resources/designSystems/twoComponentsWithConfig',
    serverCmdArgs: [
      '--webpack-config "./webpack.config.js"',
    ],
  });

  beforeAll(async () => {
    const origin:string = 'https://app.uxpin.com';
    response = await axiosPromise('/code/categories', { headers: { origin } });
  });

  it('should responds with OK status code', async () => {
    expect(response.status).toEqual(OK);
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
    expect(response.data).toMatchSnapshot();
  });
});
