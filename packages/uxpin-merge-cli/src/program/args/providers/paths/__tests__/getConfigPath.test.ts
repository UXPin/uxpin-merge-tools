import { ProgramArgs } from '../../../ProgramArgs';
import { getConfigPath } from '../getConfigPath';

describe('getConfigPath', () => {
  describe('returning absolute path of the config file', () => {
    it('resolves path relatively to the project root when the given path is relative', () => {
      // given
      const args: Partial<ProgramArgs> = {
        config: '../directory/file.js',
        cwd: '/project/root/dir',
      };

      // then
      expect(getConfigPath(args as ProgramArgs)).toEqual('/project/root/directory/file.js');
    });
  });

  it('returns absolute path, when the given path is absolute', () => {
    // given
    const args: Partial<ProgramArgs> = {
      config: '/absolute/directory/file.js',
      cwd: '/project/root/dir',
    };

    // then
    expect(getConfigPath(args as ProgramArgs)).toEqual('/absolute/directory/file.js');
  });
});
