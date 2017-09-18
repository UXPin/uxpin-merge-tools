import { runUxPinCodeCommand } from '../../utils/command/runUxPinCodeCommand';

describe('The --dump option', () => {
  describe('run for the nordnet-ui-kit repository', () => {
    it('prints the JSON describing the full repository', () => {
      // when
      return runUxPinCodeCommand('resources/repos/nordnet-ui-kit', '--dump').then((consoleOutput) => {
        // then
        expect(consoleOutput).toMatchSnapshot();
      });
    });
  });

  describe('run for the arui-feather repository', () => {
    it('prints the JSON describing the full repository', () => {
      // when
      return runUxPinCodeCommand('resources/repos/arui-feather', '--dump').then((consoleOutput) => {
        // then
        expect(consoleOutput).toMatchSnapshot();
      });
    });
  });
});
