import { resolve } from 'path';
import { isGitRepository } from '../isGitRepository';

describe('itGitRepository', () => {
  it('should return true if directory belongs to a valid git repository', async () => {
    // given
    const cwd:string = resolve(__dirname, '../../../../../../../../test/resources/repos/git-repo');

    // when
    const isGit:boolean = await isGitRepository(cwd);

    // then
    expect(isGit).toBe(true);
  });

  it('should return false if directory is not a valid git repository', async () => {
    // given
    const cwd:string = resolve(__dirname, '../../../../../../../../../../../');

    // when
    const isGit:boolean = await isGitRepository(cwd);

    // then
    expect(isGit).toBe(false);
  });
});
