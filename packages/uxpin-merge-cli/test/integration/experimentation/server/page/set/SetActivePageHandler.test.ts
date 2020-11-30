import { writeJson } from 'fs-extra';
import { OK } from 'http-status-codes';
import { join } from 'path';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { CodeSyncMetadata } from '../../../../../../src/common/types/CodeSyncMetadata';
import { PageContent, PageData } from '../../../../../../src/common/types/PageData';
import { TEMP_DIR_NAME } from '../../../../../../src/steps/building/config/getConfig';
import { PAGE_FILE_NAME } from '../../../../../../src/steps/experimentation/server/handler/page/save/PageSaveHandler';
import {
  expectedAvatarMetadata,
  expectedButtonMetadata,
} from '../../../../../resources/designSystems/twoComponentsWithConfig/expectedMetadata';
import { getRandomPortNumber } from '../../../../../utils/e2e/server/getRandomPortNumber';
import { setupExperimentationServerTest } from '../../../../../utils/experimentation/setupExperimentationServerTest';
import { examplePageContent } from './fixtures/examplePageContent';
import { getExpectedIntroPageWithExampleElementsGuessingUniqueIdsFrom } from './fixtures/getExpectedIntroPageWithExampleElementsGuessingUniqueIdsFrom';

const TIMEOUT:number = 80000;
jest.setTimeout(TIMEOUT);

describe('Experimentation server – handling set active page request', () => {

  const port:number = getRandomPortNumber();
  const { request, getWorkingDir } = setupExperimentationServerTest({
    port,
    projectPath: 'resources/designSystems/twoComponentsWithConfig',
    serverCmdArgs: [
      '--webpack-config="./webpack.config.js"',
    ],
  });

  let response:Response;

  describe('when no page data is stored', () => {
    beforeAll(async () => {
      // given
      const origin:string = 'https://app.uxpin.com';
      const requestOptions:RequestPromiseOptions = {
        form: {
          json: '{"id_page":"112","id_project":456}',
        },
        headers: { origin },
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

    it('responds with a page object with the example elements on the canvas', () => {
      // when
      const responseBody:any = JSON.parse(response.body);

      // then
      const expectedPage:PageContent = getExpectedIntroPageWithExampleElementsGuessingUniqueIdsFrom(responseBody.page);
      const revisionId:string = '3ab57996-fdf2-41cd-b3c6-85ba98596081_33a58bbfb9e97c671048f796c842723f13599762';
      const expectedBody:PageData = {
        code_sync: getExpectedCodeSyncMetadata(revisionId),
        component_version: null,
        components_master_ids: [],
        components_versions: [],
        components_versions_map: [],
        is_component: '0',
        last_update: '0',
        page: expectedPage,
      };

      expect(responseBody).toEqual(expectedBody);
    });
  });

  describe('when page data is stored in temp dir', () => {
    beforeAll(async () => {
      const contentFilePath:string = join(getWorkingDir(), TEMP_DIR_NAME, PAGE_FILE_NAME);
      await writeJson(contentFilePath, examplePageContent);

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

    it('responds with a stored page content', () => {
      // given
      const revisionId:string = '3ab57996-fdf2-41cd-b3c6-85ba98596081_33a58bbfb9e97c671048f796c842723f13599762';
      const expectedBody:PageData = {
        code_sync: getExpectedCodeSyncMetadata(revisionId),
        component_version: null,
        components_master_ids: [],
        components_versions: [],
        components_versions_map: [],
        is_component: '0',
        last_update: '0',
        page: examplePageContent,
      };

      // then
      expect(JSON.parse(response.body)).toEqual(expectedBody);
    });
  });

  function getExpectedCodeSyncMetadata(revisionId:string):CodeSyncMetadata {
    return {
      bundles: {
        [revisionId]: 'https://sessionId.ngrok.io/code/library.js',
      },
      components: {
        'ba14886c-2674-52a3-a147-7b88e725e4ee': {
          componentId: 'ba14886c-2674-52a3-a147-7b88e725e4ee',
          info: expectedButtonMetadata.info,
          name: expectedButtonMetadata.name,
          properties: expectedButtonMetadata.properties,
          revisionId,
          wrappers: [],
        },
        'f2dff102-3d25-5174-b733-12c4e58fdd5d': {
          componentId: 'f2dff102-3d25-5174-b733-12c4e58fdd5d',
          info: expectedAvatarMetadata.info,
          name: expectedAvatarMetadata.name,
          properties: expectedAvatarMetadata.properties,
          revisionId,
          wrappers: [],
        },
      },
      presets: {
        '02943eee-ab9a-57c6-adf8-d5c4978cd0b1': {
          componentRevisionId: `${revisionId}_f2dff102-3d25-5174-b733-12c4e58fdd5d`,
          ...expectedAvatarMetadata.presets[0],
          presetId: '02943eee-ab9a-57c6-adf8-d5c4978cd0b1',
          sortIndex: 0,
        },
        '364b2288-4144-5962-8ad2-7c5ebc0ab2ae': {
          componentRevisionId: `${revisionId}_ba14886c-2674-52a3-a147-7b88e725e4ee`,
          ...expectedButtonMetadata.presets[0],
          presetId: '364b2288-4144-5962-8ad2-7c5ebc0ab2ae',
          sortIndex: 0,
        },
      },
    };
  }
});
