import * as path from 'path';
import { getEPIDFilePath } from '../getEPIDFilePath';
import { getProjectEPID } from '../getProjectEPID';

describe('getProjectEPID', () => {
  it('should read epid file and convert it to EPID object', async () => {
    // given
    const projectPath: string = path.resolve(__dirname, '../../../../../test/resources/designSystems/withEpidFile/');
    const filePath: string = getEPIDFilePath(projectPath);

    // when
    // then
    expect(await getProjectEPID(filePath)).toMatchSnapshot();
  });

  it("should throws error when epid file doesn't exists", async () => {
    // given
    const projectPath = './not/exists';
    const filePath: string = getEPIDFilePath(projectPath);

    // when
    // then
    await expect(getProjectEPID(filePath)).rejects.toThrowError(/no such file or directory/);
  });
});
