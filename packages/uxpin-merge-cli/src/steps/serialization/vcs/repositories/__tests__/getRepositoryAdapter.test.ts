import { resolve } from 'path';
import { getRepositoryAdapter } from '../getRepositoryAdapter';
import { GitRepositoryAdapter } from '../git/GitRepositoryAdapter';
import { RepositoryAdapter } from '../RepositoryAdapter';

describe('getRepositoryAdapter', () => {
  it('should throw an error when version control system will not be determined for given directory', () => {
    // given
    const cwd:string = resolve(__dirname, '../../../../../../../../../');

    // then
    expect(getRepositoryAdapter(cwd)).rejects.toThrow();
  });

  it('should return GitRepositoryAdapter for git repository', async () => {
    // given
    const cwd:string = resolve(__dirname, '../../../../../../test/resources/repos/git-repo');

    // when
    const adapter:RepositoryAdapter = await getRepositoryAdapter(cwd);

    // then
    expect(adapter).toBeInstanceOf(GitRepositoryAdapter);
  });
});
