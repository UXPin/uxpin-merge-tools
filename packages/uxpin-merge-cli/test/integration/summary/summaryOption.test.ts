import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 15000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints a info when there`s no config file in the project', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/designSystems/noSrcDir',
        params: ['push', '--summary'],
      }).then((output) => {
        // then
        expect(output).toContain('uxpin.config.js\' not found. Using default configuration.');
      });
    });
  });
});
