import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 120000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('The dump command', () => {
  it('run for the polaris repository, prints the JSON describing the full repository', () => {
    // when
    return runUXPinMergeCommand({
      cwd: 'resources/repos/polaris',
      params: [Command.DUMP, '--config="../../configs/polaris-uxpin.config.js"'],
    }).then((consoleOutput) => {
      // then
      expect(JSON.parse(consoleOutput)).toMatchSnapshot();
    });
  });
});
