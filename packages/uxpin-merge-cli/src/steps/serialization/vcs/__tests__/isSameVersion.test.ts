import { DesignSystemSnapshot } from '../../DesignSystemSnapshot';
import { isSameVersion } from '../isSameVersion';

describe('isSameVersion', () => {
  it('should return true if repository points the same commit as source commit', () => {
    // given
    const ds: DesignSystemSnapshot = {
      categorizedComponents: [],
      name: 'Library',
      vcs: {
        branchName: 'master',
        commitHash: '123abc',
        movedObjects: {
          components: {},
          diffSourceCommitHash: '123abc',
        },
      },
    };

    // when
    const isSame: boolean = isSameVersion(ds);

    // then
    expect(isSame).toBe(true);
  });

  it('should return false if repository points different commit than source commit', () => {
    // given
    const ds: DesignSystemSnapshot = {
      categorizedComponents: [],
      name: 'Library',
      vcs: {
        branchName: 'master',
        commitHash: '123abc',
        movedObjects: {
          components: {},
          diffSourceCommitHash: '456def',
        },
      },
    };

    // when
    const isSame: boolean = isSameVersion(ds);

    // then
    expect(isSame).toBe(false);
  });

  it('should return false if source commit is not provided', () => {
    // given
    const ds: DesignSystemSnapshot = {
      categorizedComponents: [],
      name: 'Library',
      vcs: {
        branchName: 'master',
        commitHash: '123abc',
      },
    };

    // when
    const isSame: boolean = isSameVersion(ds);

    // then
    expect(isSame).toBe(false);
  });
});
