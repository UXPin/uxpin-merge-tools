import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as FormData from 'form-data';
import { createReadStream } from 'fs';
import { ensureDir } from 'fs-extra';
import { OK } from 'http-status-codes';
import { join } from 'path';
import { TEMP_DIR_NAME } from '../../../../../src/steps/building/config/getConfig';
import { UPLOAD_DIR_NAME } from '../../../../../src/steps/experimentation/server/handler/upload/PrepareUploadHandler';
import { setupExperimentationServerTest } from '../../../../utils/experimentation/setupExperimentationServerTest';
import { getFileChecksum } from '../../../../utils/file/getFileChecksum';

const TIMEOUT = 120000;
jest.setTimeout(TIMEOUT);

describe('UploadHandler', () => {
  const { axiosPromise, getWorkingDir } = setupExperimentationServerTest();

  it('receives uploaded file and saves in the correct dir based on given path parameter', async () => {
    // given
    const fileName = 'uxpin_logo_white_720-1.png';
    const fileId = `12311`;
    const fixtureFilePath = join(__dirname, 'fixtures', fileName);
    const expectedFileChecksum = await getFileChecksum(fixtureFilePath);
    const targetDir = join(getWorkingDir(), TEMP_DIR_NAME, UPLOAD_DIR_NAME, fileId);
    const expectedFileLocation = join(targetDir, fileName);

    const formData: FormData = new FormData();
    formData.append('file', createReadStream(fixtureFilePath));
    formData.append('path', `${fileId}/${fileName}`);

    const requestOptions: AxiosRequestConfig = {
      data: formData,
      headers: formData.getHeaders(),
      method: 'POST',
    };

    // when
    await ensureDir(targetDir);
    const response: AxiosResponse = await axiosPromise('/upload', requestOptions);

    // then
    expect(response.status).toEqual(OK);
    expect(await getFileChecksum(expectedFileLocation)).toEqual(expectedFileChecksum);
  });
});
