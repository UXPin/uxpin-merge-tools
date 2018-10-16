import { NOT_FOUND } from 'http-status-codes';
import { Response } from 'request';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

describe('Experimentation server – handling not found path', () => {

  const { request } = setupExperimentationServerTest({ projectPath: './' });

  it('Responds with NOT_FOUND status code', async () => {
    // when
    const response:Response = await request('/nonexistent/path', { simple: false, resolveWithFullResponse: true });

    // then
    expect(response.statusCode).toEqual(NOT_FOUND);
    expect(response.body).toEqual('');
  });
});
