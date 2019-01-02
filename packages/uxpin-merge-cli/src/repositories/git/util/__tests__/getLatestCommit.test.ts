import { resolve } from 'path';
import { CommitMetadata } from '../../../RepositoryAdapter';
import { getLatestCommit } from '../getLatestCommit';

describe('getLatestCommit', () => {
  it('should get info about latest commit', async () => {
    // given
    const path:string = resolve(__dirname, '../../../../../test/resources/repos/nordnet-ui-kit');

    // when
    const commit:CommitMetadata = await getLatestCommit(path);

    // then
    expect(commit).toEqual({
      author: 'Robin Sand',
      date: 'Tue, 12 Sep 2017 10:23:28 +0200',
      hash: 'd914edd5f97cadb284f7f47b783106c86fe430d9',
      message: 'feat: Trigger props.onClick on every state change',
    });
  });
});
