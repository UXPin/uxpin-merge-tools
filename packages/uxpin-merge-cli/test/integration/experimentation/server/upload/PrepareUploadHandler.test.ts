import { readJson } from 'fs-extra';
import { OK } from 'http-status-codes';
import { join } from 'path';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { TEMP_DIR_NAME } from '../../../../../src/steps/building/config/getConfig';
import { PrepareUploadFormData } from '../../../../../src/steps/experimentation/server/handler/upload/PrepareUploadFormData';
import {
  UPLOAD_DIR_NAME,
  UPLOAD_METADATA_FILE_NAME,
} from '../../../../../src/steps/experimentation/server/handler/upload/PrepareUploadHandler';
import { PrepareUploadResponse } from '../../../../../src/steps/experimentation/server/handler/upload/PrepareUploadResponse';
import { UploadItemMetadata } from '../../../../../src/steps/experimentation/server/handler/upload/UploadItemMetadata';
import { getRandomPortNumber } from '../../../../utils/e2e/server/getRandomPortNumber';
import { setupExperimentationServerTest } from '../../../../utils/experimentation/setupExperimentationServerTest';

const TIMEOUT = 120000;
jest.setTimeout(TIMEOUT);

describe('Experimentation server – handling upload preparation', () => {
  const port: number = getRandomPortNumber();
  const { request, getWorkingDir } = setupExperimentationServerTest({ port });

  describe('when requesting preparation of the upload', () => {
    let response: Response;

    describe('for the first file', () => {
      beforeAll(async () => {
        const firstRequestFormDataJson: PrepareUploadFormData = {
          add_to_library: 1,
          directory_id: 0,
          file_name: 'uploaded_file_name.png',
          file_size: 8895,
          file_type: 'image/png',
          id_collection: 1560754,
          no_redirect: 1,
          overwrite: 0,
          resolution: '128x110',
        };

        const requestOptions: RequestPromiseOptions = {
          form: {
            json: JSON.stringify(firstRequestFormDataJson),
          },
          headers: {
            origin: 'https://app.uxpin.com',
          },
          method: 'POST',
          resolveWithFullResponse: true,
        };

        // when
        response = await request('/ajax/dmsFileManager/PrepareUpload/', requestOptions);
      });

      it('responds with OK status code and correct headers', async () => {
        // given
        const expectedHeaders: any = {
          'access-control-allow-credentials': 'true',
          'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Range',
          'access-control-allow-origin': 'https://app.uxpin.com',
          'content-type': 'text/xml; charset=utf-8',
        };

        // then
        expect(response.statusCode).toEqual(OK);
        expect(response.headers).toEqual(expect.objectContaining(expectedHeaders));
      });

      it('returns upload params object with for the first file', () => {
        // given
        const expectedResponse: PrepareUploadResponse = {
          file_data: {
            extension: 'png',
            id_stored_file: '1',
            id_tree: expect.any(String),
            name: 'uploaded_file_name',
            original_name: 'uploaded_file_name.png',
            path: '1/',
            resolution: '128x110',
            size: 8895,
            type: 'image/png',
          },
          final_url: `http://localhost:${port}/upload/1/uploaded_file_name.png`,
          id_stored_file: '1',
          message: '',
          params: {
            path: '1/uploaded_file_name.png',
          },
          status: true,
          upload_url: `http://localhost:${port}/upload`,
        };

        // then
        expect(JSON.parse(response.body)).toEqual(expectedResponse);
      });

      describe('and then requesting upload of the second file (even with the same name)', () => {
        beforeAll(async () => {
          const secondRequestFormDataJson: PrepareUploadFormData = {
            add_to_library: 1,
            directory_id: 0,
            file_name: 'uploaded_file_name.png',
            file_size: 8895,
            file_type: 'image/png',
            id_collection: 1560754,
            no_redirect: 1,
            overwrite: 0,
            resolution: '128x110',
          };

          const requestOptions: RequestPromiseOptions = {
            form: {
              json: JSON.stringify(secondRequestFormDataJson),
            },
            method: 'POST',
            resolveWithFullResponse: true,
          };

          // when
          response = await request('/ajax/dmsFileManager/PrepareUpload/', requestOptions);
        });

        it('responds with the correct final URL for the second file', () => {
          // given
          const expectedResponse: PrepareUploadResponse = {
            file_data: {
              extension: 'png',
              id_stored_file: '2',
              id_tree: expect.any(String),
              name: 'uploaded_file_name',
              original_name: 'uploaded_file_name.png',
              path: '2/',
              resolution: '128x110',
              size: 8895,
              type: 'image/png',
            },
            final_url: `http://localhost:${port}/upload/2/uploaded_file_name.png`,
            id_stored_file: '2',
            message: '',
            params: {
              path: '2/uploaded_file_name.png',
            },
            status: true,
            upload_url: `http://localhost:${port}/upload`,
          };

          // then
          expect(JSON.parse(response.body)).toEqual(expectedResponse);
        });

        it('creates correct metadata file', async () => {
          // given
          const expectedMetadata: UploadItemMetadata = {
            contentType: 'image/png',
            fileName: 'uploaded_file_name.png',
          };
          const expectedMetadataFilePath: string = join(
            getWorkingDir(),
            TEMP_DIR_NAME,
            UPLOAD_DIR_NAME,
            '2',
            UPLOAD_METADATA_FILE_NAME
          );

          // then
          expect(await readJson(expectedMetadataFilePath)).toEqual(expectedMetadata);
        });
      });
    });
  });
});
