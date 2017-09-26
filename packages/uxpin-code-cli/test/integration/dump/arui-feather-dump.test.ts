import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';

describe('The --dump option', () => {
  describe('run for the arui-feather repository', () => {
    it('prints the JSON describing the full repository', () => {
      // when
      return runUXPinCodeCommand('resources/repos/arui-feather', '--dump').then((consoleOutput) => {
        // then
        expect(consoleOutput).toMatchSnapshot();
      });
    });
  });
});
