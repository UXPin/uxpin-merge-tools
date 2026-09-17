import { ProvidedRepositoryAdapter } from '../ProvidedRepositoryAdapter';

/**
 * The revision of a project that never was a working copy. Git answers this by
 * reading .git; a library serialized from a server has it answered by whoever
 * assembled the files.
 */
describe('a revision the caller names', () => {
  it('is what the snapshot is filed under', async () => {
    const adapter = new ProvidedRepositoryAdapter({
      author: 'Wire',
      branchName: 'master',
      commitHash: 'deadbeef',
      date: '2026-09-17T00:00:00.000Z',
      message: 'Published from Wire',
    });

    expect(await adapter.getCurrentBranch()).toEqual('master');
    expect(await adapter.getLatestCommit()).toEqual({
      author: 'Wire',
      date: '2026-09-17T00:00:00.000Z',
      hash: 'deadbeef',
      message: 'Published from Wire',
    });
  });

  it('needs only a branch and a hash; the rest is what a commit would have said', async () => {
    const adapter = new ProvidedRepositoryAdapter({ branchName: 'feat/wire', commitHash: 'abc123' });

    const commit = await adapter.getLatestCommit();
    expect(commit).toMatchObject({ author: '', hash: 'abc123', message: '' });
    expect(Date.parse(commit.date)).not.toBeNaN();
  });

  it('reports no moved files, having nothing to compare against', async () => {
    const adapter = new ProvidedRepositoryAdapter({ branchName: 'master', commitHash: 'abc123' });

    expect(await adapter.getMovedFiles()).toEqual({});
  });
});
