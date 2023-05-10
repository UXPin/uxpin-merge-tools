import { AxiosError, AxiosResponse } from 'axios';
import { NOT_FOUND } from 'http-status-codes';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 30000;

describe('Experimentation server – handling not found path', () => {
  const { axiosPromise } = setupExperimentationServerTest({
    timeout: CURRENT_TIMEOUT,
  });

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
