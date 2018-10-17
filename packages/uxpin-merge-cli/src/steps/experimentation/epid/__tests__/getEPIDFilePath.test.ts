import * as path from 'path';
import { TEMP_DIR_PATH } from '../../../building/config/getConfig';
import { EPID_FILENAME, getEPIDFilePath } from '../getEPIDFilePath';

describe('getEPIDFilePath', () => {
  it('should returns epid file path for current directory', () => {
    // given
    const projectRoot:string = __dirname;

    // when
    // then
    const expectedFilePath:string = path.join(projectRoot, TEMP_DIR_PATH, EPID_FILENAME);
    expect(getEPIDFilePath(projectRoot)).toEqual(expectedFilePath);
  });

  it('should returns epid file path for different directory than current', () => {
    // given
    const projectRoot:string = path.resolve(__dirname, '..');

    // when
    // then
    const expectedFilePath:string = path.join(projectRoot, TEMP_DIR_PATH, EPID_FILENAME);
    expect(getEPIDFilePath(projectRoot)).toEqual(expectedFilePath);
  });
});
