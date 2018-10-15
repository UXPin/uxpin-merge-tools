import { OK } from 'http-status-codes';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

describe('Experimentation server – handling save page request', () => {

  const { request } = setupExperimentationServerTest({ projectPath: './' });

  it('Responds with OK status code and correct headers', async () => {
    // given
    const options:RequestPromiseOptions = { method: 'POST', resolveWithFullResponse: true };
    const expectedHeaders:any = {
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'Access-Control-Allow-Origin': 'https://app.uxpin.com',
    };

    // when
    const response:Response = await request('/ajax/dmsDPPage/Save/?__ajax_request=1', options);

    // then
    expect(response.statusCode).toEqual(OK);
    expect(response.body).toEqual('');
    expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
  });
});
