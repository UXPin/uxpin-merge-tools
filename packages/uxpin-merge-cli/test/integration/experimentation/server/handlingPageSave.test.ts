import { OK } from 'http-status-codes';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { setTimeoutBeforeAll } from '../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Experimentation server – handling save page request', () => {
  const { request } = setupExperimentationServerTest({ projectPath: './' });

  it('Responds with OK status code and correct headers', async () => {
    // given
    const options:RequestPromiseOptions = { method: 'POST', resolveWithFullResponse: true };
    const expectedHeaders:any = {
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'access-control-allow-origin': 'https://app.uxpin.com',
    };

    // when
    const response:Response = await request('/ajax/dmsDPPage/Save/?__ajax_request=1', options);

    // then
    expect(response.statusCode).toEqual(OK);
    expect(response.body).toEqual('{}');
    expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
  });
});
