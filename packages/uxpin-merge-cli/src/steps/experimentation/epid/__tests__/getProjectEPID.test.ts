import * as path from 'path';
import { getProjectEPID } from '../getProjectEPID';

describe('getProjectEPID', () => {
  it('should read epid file and convert it to EPID format', async () => {
    // given
    const projectPath:string = path.resolve(__dirname, '../../../../../test/resources/designSystems/withEpidFile/');

    // when
    // then
    expect(await getProjectEPID(projectPath)).toMatchSnapshot();
  });

  it('should throws error when epid file doesn\'t exists', async () => {
    // given
    const projectPath:string = './not/exists';

    // when

    // then
    await expect(getProjectEPID(projectPath)).rejects.toThrowError(/no such file or directory/);
  });
});
