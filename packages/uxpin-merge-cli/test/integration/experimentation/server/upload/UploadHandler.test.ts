import { createReadStream } from 'fs';
import { ensureDir } from 'fs-extra';
import { OK } from 'http-status-codes';
import { join } from 'path';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { TEMP_DIR_NAME } from '../../../../../src/steps/building/config/getConfig';
import { UPLOAD_DIR_NAME } from '../../../../../src/steps/experimentation/server/handler/upload/PrepareUploadHandler';
import { setupExperimentationServerTest } from '../../../../utils/experimentation/setupExperimentationServerTest';
import { getFileChecksum } from '../../../../utils/file/getFileChecksum';

const TIMEOUT:number = 120000;
jest.setTimeout(TIMEOUT);

describe('UploadHandler', () => {

  const { request, getWorkingDir } = setupExperimentationServerTest();

  it('receives uploaded file and saves in the correct dir based on given path parameter', async () => {
    // given
    const fileName:string = 'uxpin_logo_white_720-1.png';
    const fileId:string = '12311';
    const fixtureFilePath:string = join(__dirname, 'fixtures', fileName);
    const expectedFileChecksum:string = await getFileChecksum(fixtureFilePath);
    const targetDir:string = join(getWorkingDir(), TEMP_DIR_NAME, UPLOAD_DIR_NAME, fileId);
    const expectedFileLocation:string = join(targetDir, fileName);
    const requestOptions:RequestPromiseOptions = {
      formData: {
        file: createReadStream(fixtureFilePath),
        path: `${fileId}/${fileName}`,
      },
      method: 'POST',
      resolveWithFullResponse: true,
    };

    // when
    await ensureDir(targetDir);
    const response:Response = await request('/upload', requestOptions);

    // then
    expect(response.statusCode).toEqual(OK);
    expect(await getFileChecksum(expectedFileLocation)).toEqual(expectedFileChecksum);
  });
});
