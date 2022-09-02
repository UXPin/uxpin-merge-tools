import { resolve } from 'path';
import { execAsync } from '../../../../../../../utils/child_process/execAsync';
import { MovedFilePathsMap } from '../../../../../DesignSystemSnapshot';
import { getMovedFiles } from '../getMovedFiles';

describe('getMovedFiles', () => {
  it('should get map of moved files', async () => {
    // given
    const cwd: string = resolve(__dirname, '../../../../../../../../test/resources/repos/git-repo-rename');
    const hashes: string = await execAsync('git log -n 2 --pretty="format:%H"', { cwd });
    const [revision2, revision1] = hashes.split('\n');

    // when
    const files: MovedFilePathsMap = await getMovedFiles(cwd, revision1, revision2);

    // then
    expect(files).toEqual({
      'Component.js': 'RenamedComponent.js',
    });
  });
});
