import { OK } from 'http-status-codes';
import { resolve } from 'path';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { PageData } from '../../../../src/common/types/PageData';
import {
  expectedAvatarMetadata,
  expectedButtonMetadata,
} from '../../../resources/designSystems/twoComponentsWithConfig/expectedMetadata';
import { getRandomPortNumber } from '../../../utils/e2e/server/getRandomPortNumber';
import { setupExperimentationServerTest } from '../../../utils/experimentation/setupExperimentationServerTest';

const TIMEOUT:number = 80000;
jest.setTimeout(TIMEOUT);

describe('Experimentation server – handling set active page request', () => {

  const port:number = getRandomPortNumber();
  const { request } = setupExperimentationServerTest({
    port,
    projectPath: resolve(__dirname, '../../../resources/designSystems/twoComponentsWithConfig'),
    serverCmdArgs: ['--webpack-config="./webpack.config.js"'],
    useTempDir: true,
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
      'content-type': 'text/xml; charset=utf-8',
    };

    // then
    expect(response.statusCode).toEqual(OK);
    expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
  });

  it('responds with a page object with an empty canvas', () => {
    // given
    const revisionId:string = '3ab57996-fdf2-41cd-b3c6-85ba98596081_33a58bbfb9e97c671048f796c842723f13599762';
    const expectedBody:PageData = {
      code_sync: {
        bundles: {
          [revisionId]: `http://localhost:${port}/code/library.js`,
        },
        components: {
          'ba14886c-2674-52a3-a147-7b88e725e4ee': {
            componentId: 'ba14886c-2674-52a3-a147-7b88e725e4ee',
            info: expectedButtonMetadata.info,
            name: expectedButtonMetadata.name,
            properties: expectedButtonMetadata.properties,
            revisionId,
          },
          'f2dff102-3d25-5174-b733-12c4e58fdd5d': {
            componentId: 'f2dff102-3d25-5174-b733-12c4e58fdd5d',
            info: expectedAvatarMetadata.info,
            name: expectedAvatarMetadata.name,
            properties: expectedAvatarMetadata.properties,
            revisionId,
          },
        },
        presets: {
          'a7b05955-128e-5570-9968-26fa6d8f8705': {
            componentRevisionId: `${revisionId}_f2dff102-3d25-5174-b733-12c4e58fdd5d`,
            ...expectedAvatarMetadata.presets[0],
            presetId: 'a7b05955-128e-5570-9968-26fa6d8f8705',
            sortIndex: 0,
          },
          'c383bd8a-caf4-5f90-a6b1-3471c355fc43': {
            componentRevisionId: `${revisionId}_ba14886c-2674-52a3-a147-7b88e725e4ee`,
            ...expectedButtonMetadata.presets[0],
            presetId: 'c383bd8a-caf4-5f90-a6b1-3471c355fc43',
            sortIndex: 0,
          },
        },
      },
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
