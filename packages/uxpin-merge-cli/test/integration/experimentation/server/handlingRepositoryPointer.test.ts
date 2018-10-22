import { NO_CONTENT } from 'http-status-codes';
import { Response } from 'request';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

describe('Experimentation server - handling repository pointer', () => {
  const { request } = setupExperimentationServerTest({ projectPath: './' });

  it('should responds with NO_CONTENT status code', async () => {
    // when
    const response:Response = await request('/code/repositoryPointer', { resolveWithFullResponse: true });

    // then
    expect(response.statusCode).toEqual(NO_CONTENT);
  });

  it('should responds with correct CORS headers', async () => {
    // given
    const expectedHeaders:any = {
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'access-control-allow-origin': 'https://app.uxpin.com',
    };

    // when
    const response:Response = await request('/code/repositoryPointer', { resolveWithFullResponse: true });

    // then
    expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
  });
});
