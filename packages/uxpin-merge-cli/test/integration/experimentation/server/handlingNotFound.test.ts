import { AxiosError, AxiosResponse } from 'axios';
import { NOT_FOUND } from 'http-status-codes';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation server – handling not found path', () => {
  const { axiosPromise } = setupExperimentationServerTest();

  it('Responds with NOT_FOUND status code', async () => {
    // when
    const response: AxiosResponse | undefined = await axiosPromise('/nonexistent/path', {}).catch(
      (error: AxiosError) => {
        return error.response;
      }
    );

    // then
    expect(response?.status).toEqual(NOT_FOUND);
    expect(response?.data).toEqual('Not found');
  });
});
