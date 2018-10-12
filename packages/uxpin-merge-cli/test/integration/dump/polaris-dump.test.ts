import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 120000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('The --dump option', () => {
  it('run for the polaris repository, prints the JSON describing the full repository', () => {
    // when
    return runUXPinMergeCommand({
      cwd: 'resources/repos/polaris',
      params: ['push', '--dump', '--config="../../configs/polaris-uxpin.config.js"'],
    }).then((consoleOutput) => {
      // then
      expect(consoleOutput).toMatchSnapshot();
    });
  });
});
