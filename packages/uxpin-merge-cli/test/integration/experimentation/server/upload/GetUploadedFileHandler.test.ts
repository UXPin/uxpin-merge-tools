import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { copy, ensureDir, writeJson } from 'fs-extra';
import { OK } from 'http-status-codes';
import { join, parse } from 'path';
import { TEMP_DIR_NAME } from '../../../../../src/steps/building/config/getConfig';
import {
  UPLOAD_DIR_NAME,
  UPLOAD_METADATA_FILE_NAME,
} from '../../../../../src/steps/experimentation/server/handler/upload/PrepareUploadHandler';
import { UploadItemMetadata } from '../../../../../src/steps/experimentation/server/handler/upload/UploadItemMetadata';
import { setTimeoutBeforeAll } from '../../../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../../../utils/experimentation/setupExperimentationServerTest';
import { getBufferChecksum, getFileChecksum } from '../../../../utils/file/getFileChecksum';

const CURRENT_TIMEOUT = 10000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('GetUploadedFileHandler', () => {
  const { axiosPromise, getWorkingDir } = setupExperimentationServerTest();

  it('responds with a file for given id', async () => {
    // given
    const fileId = `12311`;
    const fixtureFilePath = join(__dirname, 'fixtures', 'uxpin_logo_white_720-1.png');
    const expectedFileChecksum = await getFileChecksum(fixtureFilePath);
    const requestOptions: AxiosRequestConfig = {
      method: 'GET',
      responseType: 'arraybuffer',
    };
    await placeFixtureInUploadDir(fixtureFilePath, fileId);

    // when
    const response: AxiosResponse = await axiosPromise('/upload/12311/uxpin_logo_white_720-1.png', requestOptions);

    // then
    expect(response.status).toEqual(OK);
    expect(response.headers['content-type']).toEqual('image/png');
    expect(getBufferChecksum(response.data)).toEqual(expectedFileChecksum);
  });

  async function placeFixtureInUploadDir(fixturePath: string, fileId: string): Promise<void> {
    const fixtureFileName: string = parse(fixturePath).base;
    const uploadedFileLocation: string = join(getWorkingDir(), TEMP_DIR_NAME, UPLOAD_DIR_NAME, fileId);
    await ensureDir(uploadedFileLocation);
    await copy(fixturePath, join(uploadedFileLocation, fixtureFileName));
    const metadata: UploadItemMetadata = {
      contentType: 'image/png',
      fileName: fixtureFileName,
    };
    await writeJson(join(uploadedFileLocation, UPLOAD_METADATA_FILE_NAME), metadata);
  }
});
