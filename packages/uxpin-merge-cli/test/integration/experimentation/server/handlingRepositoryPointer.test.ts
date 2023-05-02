import { AxiosResponse } from 'axios';
import { NO_CONTENT } from 'http-status-codes';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 20_000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation server - handling repository pointer', () => {
  const { axiosPromise } = setupExperimentationServerTest();

  it('should responds with NO_CONTENT status code', async () => {
    // when
    const response: AxiosResponse = await axiosPromise('/code/repositoryPointer', {});

    // then
    expect(response.status).toEqual(NO_CONTENT);
  });

  it('should responds with correct CORS headers', async () => {
    // given
    const origin = 'https://app.uxpin.com';
    const expectedHeaders = {
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'access-control-allow-origin': 'https://app.uxpin.com',
    };

    // when
    const response: AxiosResponse = await axiosPromise('/code/repositoryPointer', {
      headers: { origin },
    });

    // then
    expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
  });
});
