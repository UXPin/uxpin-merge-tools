import { resolve } from 'path';
import { execAsync } from '../../../../../../../utils/child_process/execAsync';
import { getCurrentBranch } from '../getCurrentBranch';

describe('getCurrentBranch', () => {
  let path:string;

  beforeEach(async () => {
    // given
    path = resolve(__dirname, '../../../../../../../../test/resources/repos/git-repo');
    await execAsync('git checkout master', { cwd: path });
  });

  it('should return current branch name', async () => {
    // when
    const branch:string = await getCurrentBranch(path);

    // then
    expect(branch).toEqual('master');
  });

  describe('new branch', () => {
    beforeEach(async () => {
      // given
      await execAsync('git checkout -b test', { cwd: path });
    });

    it('should return proper branch name', async () => {
      // when
      const branch:string = await getCurrentBranch(path);

      // then
      expect(branch).toEqual('test');
    });

    afterEach(async () => {
      await execAsync('git checkout master', { cwd: path });
      await execAsync('git branch -D test', { cwd: path });
    });
  });
});
