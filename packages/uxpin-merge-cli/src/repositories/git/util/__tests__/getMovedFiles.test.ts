import { resolve } from 'path';
import { MovedFilePathsMap } from '../../../../steps/serialization/DesignSystemSnapshot';
import { getMovedFiles } from '../getMovedFiles';

describe('getMovedFiles', () => {
  it('should get map of moved files', async () => {
    // given
    const path:string = resolve(__dirname, '../../../../../test/resources/repos/git-repo-rename');
    const r1:string = '05382b688bc17834666414e1d6cd119624cabe18';
    const r2:string = '072340c8e90e37eb7e7448f3292dbf87a11ff1aa';

    // when
    const files:MovedFilePathsMap = await getMovedFiles(path, r1, r2);

    // then
    expect(files).toEqual({
      'Component.js': 'RenamedComponent.js',
    });
  });
});
