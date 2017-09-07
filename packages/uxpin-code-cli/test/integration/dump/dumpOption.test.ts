import { runUxPinCodeCommand } from '../../utils/runUxPinCodeCommand';

describe('--dump option integration', () => {
  describe('--dump option prints ', () => {
    it.skip('', () => {
      // when
      return runUxPinCodeCommand('resources/repos/arui-feather', '--dump').then((output) => {
        // then
        expect(output).toContain(`
amount
app-content
app-menu
app-title
attach
button
calendar
calendar-input
card-input
checkbox-group
checkbox
collapse
copyright
dropdown
email-input`);
      });
    });
  });
});