import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';

describe('The --dump option', () => {
  describe('run for the nordnet-ui-kit repository', () => {
    it('prints the JSON describing the full repository', () => {
      // when
      return runUXPinCodeCommand('resources/repos/nordnet-ui-kit', '--dump').then((consoleOutput) => {
        // then
        expect(consoleOutput).toMatchSnapshot();
      });
    });
  });
});
