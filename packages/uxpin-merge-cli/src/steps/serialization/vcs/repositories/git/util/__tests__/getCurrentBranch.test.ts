import { resolve } from 'path';
import { DEFAULT_BRANCH_NAME } from '../../../../../../../common/constants';
import { execAsync } from '../../../../../../../utils/child_process/execAsync';
import { getCurrentBranch } from '../getCurrentBranch';

describe('getCurrentBranch', () => {
  let path: string;

  beforeEach(async () => {
    // given
    path = resolve(__dirname, '../../../../../../../../test/resources/repos/git-repo');
    await execAsync('git checkout master', { cwd: path });
  });

  it('should return current branch name', async () => {
    // when
    const branch: string = await getCurrentBranch(path);

    // then
    expect(branch).toEqual('master');
  });

  describe('new branch', () => {
    beforeEach(async () => {
      // given
      await execAsync('git checkout -b test', { cwd: path });
    });

    it('should return master if not given an override', async () => {
      // when
      const branch: string = await getCurrentBranch(path);

      // then
      expect(branch).toEqual(DEFAULT_BRANCH_NAME);
    });

    it('should return the real branch name only if given an override', async () => {
      // when
      const branch: string = await getCurrentBranch(path, 'test');

      // then
      expect(branch).toEqual('test');
    });

    afterEach(async () => {
      await execAsync('git checkout master', { cwd: path });
      await execAsync('git branch -D test', { cwd: path });
    });
  });
});
