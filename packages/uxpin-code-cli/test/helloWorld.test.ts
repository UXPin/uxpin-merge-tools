import { runUxPinCodeCommand } from './utils/runUxPinCodeCommand';

describe('uxpin-code command integration', () => {
  describe('when executed without arguments', () => {
    it('prints hello world into the console and exit with code 0', () => {
      // given

      // when
      return runUxPinCodeCommand().then((stdout) => {
        // then
        expect(stdout).toContain('Hello World!');
      });
    });
  });
});
