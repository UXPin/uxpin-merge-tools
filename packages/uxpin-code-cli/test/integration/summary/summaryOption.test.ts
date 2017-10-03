import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 15000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints an error when there`s no `src` directory in the project', () => {
      // given

      // when
      return runUXPinCodeCommand('resources/designSystems/noSrcDir', '--summary').then((output) => {
        // then
        expect(output).toContain('Unable to locate components source directory');
      });
    });
  });
});
