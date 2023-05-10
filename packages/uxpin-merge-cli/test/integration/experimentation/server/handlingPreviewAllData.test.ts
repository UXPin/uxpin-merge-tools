import { AxiosResponse } from 'axios';
import { OK } from 'http-status-codes';
import { omit } from 'lodash';
import { PageContent } from '../../../../src/common/types/PageData';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';
import { getExpectedIntroPageWithExampleElementsGuessingUniqueIdsFrom } from './page/set/fixtures/getExpectedIntroPageWithExampleElementsGuessingUniqueIdsFrom';

const CURRENT_TIMEOUT = 300000;

describe('Experimentation mode - handling preview all data', () => {
  const port = 8888;
  let response: AxiosResponse;
  const { axiosPromise } = setupExperimentationServerTest({
    port,
    projectPath: 'resources/designSystems/twoComponentsWithConfig',
    serverCmdArgs: ['--webpack-config "./webpack.config.js"'],
    timeout: CURRENT_TIMEOUT,
  });

  beforeAll(async () => {
    const origin = 'https://app.uxpin.com';
    response = await axiosPromise('/preview/all', { headers: { origin } });
  }, CURRENT_TIMEOUT);

  it('should responds with OK status code', async () => {
    expect(response.status).toEqual(OK);
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
    const responseBody: any = response.data;
    expect(omit(responseBody, 'pagesData.1.canvasData.page')).toMatchSnapshot();
  });

  it('should contain correct page object in the body', () => {
    // when
    const responseBody: any = response.data;
    const responsePage: PageContent = responseBody.pagesData['1'].canvasData.page;

    // then
    const expectedPage: PageContent = getExpectedIntroPageWithExampleElementsGuessingUniqueIdsFrom(responsePage);
    expect(responsePage).toEqual(expectedPage);
  });
});
