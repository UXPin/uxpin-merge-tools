import { runUXPinCodeCommand } from '../../utils/command/runUXPinCodeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 120000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('The --dump option', () => {
  it('run for the polaris repository, prints the JSON describing the full repository', () => {
    // when
    return runUXPinCodeCommand('resources/repos/polaris', '--dump').then((consoleOutput) => {
      // then
      expect(consoleOutput).toMatchSnapshot();
    });
  });
});
