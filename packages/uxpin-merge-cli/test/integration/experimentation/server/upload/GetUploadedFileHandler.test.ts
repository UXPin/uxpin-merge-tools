import { copy, ensureDir } from 'fs-extra';
import { OK } from 'http-status-codes';
import { join, parse } from 'path';
import { Response } from 'request';
import { RequestPromiseOptions } from 'request-promise';
import { TEMP_DIR_NAME } from '../../../../../src/steps/building/config/getConfig';
import { UPLOAD_DIR_NAME } from '../../../../../src/steps/experimentation/server/handler/upload/PrepareUploadHandler';
import { setupExperimentationServerTest } from '../../../../utils/experimentation/setupExperimentationServerTest';
import { getBufferChecksum, getFileChecksum } from '../../../../utils/file/getFileChecksum';

describe('GetUploadedFileHandler', () => {

  const { request, getWorkingDir } = setupExperimentationServerTest();

  it('responds with a file for given id', async () => {
    // given
    const fileId:string = `12311`;
    const fixtureFilePath:string = join(__dirname, 'fixtures', 'uxpin_logo_white_720-1.png');
    const expectedFileChecksum:string = await getFileChecksum(fixtureFilePath);
    const requestOptions:RequestPromiseOptions = {
      encoding: null,
      method: 'GET',
      resolveWithFullResponse: true,
    };
    await placeFixtureInUploadDir(fixtureFilePath, fileId);

    // when
    const response:Response = await request('/upload/file?id=12311', requestOptions);

    // then
    expect(response.statusCode).toEqual(OK);
    expect(getBufferChecksum(response.body)).toEqual(expectedFileChecksum);
  });

  async function placeFixtureInUploadDir(fixturePath:string, fileId:string):Promise<void> {
    const fixtureFileName:string = parse(fixturePath).base;
    const uploadedFileLocation:string = join(getWorkingDir(), TEMP_DIR_NAME, UPLOAD_DIR_NAME, fileId);
    await ensureDir(uploadedFileLocation);
    await copy(fixturePath, join(uploadedFileLocation, fixtureFileName));
  }
});
