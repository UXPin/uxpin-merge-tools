import { OK } from 'http-status-codes';
import { join } from 'path';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

describe('Experimentation server – handling set active page request', () => {

  const { request } = setupExperimentationServerTest({
    projectPath: join(__dirname, '../../../resources/designSystems/withEpidFile'),
  });

  let response:Response;

  beforeAll(async () => {
    // given
    const requestOptions:RequestPromiseOptions = {
      form: {
        json: '{"id_page":"112","id_project":456}',
      },
      method: 'POST',
      resolveWithFullResponse: true,
    };

    // when
    response = await request('/ajax/dmsDPPage/SetActivePage/', requestOptions);
  });

  it('responds with OK status code and correct headers', async () => {
    // given
    const expectedHeaders:any = {
      'access-control-allow-credentials': 'true',
      'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
      'access-control-allow-origin': 'https://app.uxpin.com',
    };

    // then
    expect(response.statusCode).toEqual(OK);
    expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
  });

  it('responds with a page object with an empty canvas', () => {
    // given
    const expectedBody:any = {
      code_sync: { bundles: [], components: [], presets: [] },
      component_version: null,
      components_master_ids: [],
      components_versions: [],
      components_versions_map: [],
      is_component: '0',
      last_update: '0',
      page: {
        canvas: {
          props: { storedElements: [] },
          type: 'Canvas',
          v: '2.0',
        },
      },
    };

    // then
    expect(JSON.parse(response.body)).toEqual(expectedBody);
  });
});
