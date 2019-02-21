import { resolve } from 'path';
import { isCommit } from '../isCommit';

describe('isCommit', () => {
  let path:string;

  beforeEach(async () => {
    // given
    path = resolve(__dirname, '../../../../../../../../test/resources/repos/nordnet-ui-kit');
  });

  it('should return true if commit exists', async () => {
    // when
    // then
    expect(await isCommit(path, 'd914edd5f97cadb284f7f47b783106c86fe430d9')).toBe(true);
  });

  it('should return false if commit does not exist', async () => {
    // when
    // then
    expect(await isCommit(path, 'abc123')).toBe(false);
  });
});
