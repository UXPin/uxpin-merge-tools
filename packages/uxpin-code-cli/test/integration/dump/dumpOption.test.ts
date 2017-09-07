import { runUxPinCodeCommand } from '../../utils/runUxPinCodeCommand';

describe('--dump option integration', () => {
  describe('--dump option prints ', () => {
    it('', () => {
      // when
      runUxPinCodeCommand('--dump').then((output) => {
        // then
        expect(output).toContain('--dump');
        expect(output).toContain('Show all information about the design system repository and NOT send to UXPin')
      });
    });
  });
});