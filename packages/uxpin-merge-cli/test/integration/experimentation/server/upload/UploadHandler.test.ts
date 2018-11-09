import { OK } from 'http-status-codes';
import { join } from 'path';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { TEMP_DIR_NAME } from '../../../../../src/steps/building/config/getConfig';
import { UPLOAD_DIR_NAME } from '../../../../../src/steps/experimentation/server/handler/upload/PrepareUploadHandler';
import { readFileFromPath } from '../../../../../src/utils/fs/readFileFromPath';
import { setupExperimentationServerTest } from '../../../../utils/experimentation/setupExperimentationServerTest';
import { getFileChecksum } from '../../../../utils/file/getFileChecksum';

describe('UploadHandler', () => {

  const { request, getWorkingDir } = setupExperimentationServerTest();

  it('receives uploaded file and saves in the correct dir based on given path parameter', async () => {
    // given
    const fileName:string = 'uxpin_logo_white_720-1.png';
    const path:string = `12311/${fileName}`;
    const fixtureFilePath:string = join(__dirname, 'fixtures', fileName);
    const expectedFileChecksum:string = await getFileChecksum(fixtureFilePath);
    const expectedFileLocation:string = join(getWorkingDir(), TEMP_DIR_NAME, UPLOAD_DIR_NAME, '12311', fileName);
    const requestOptions:RequestPromiseOptions = {
      formData: {
        file: await readFileFromPath(fixtureFilePath),
        path,
      },
      method: 'POST',
      resolveWithFullResponse: true,
    };

    // when
    const response:Response = await request('/upload/', requestOptions);

    // then
    expect(response.statusCode).toEqual(OK);
    expect(await getFileChecksum(expectedFileLocation)).toEqual(expectedFileChecksum);
  });
});
