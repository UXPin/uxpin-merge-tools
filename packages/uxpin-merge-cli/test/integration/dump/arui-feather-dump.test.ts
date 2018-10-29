import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('The dump command', () => {
  describe('run for the arui-feather repository', () => {
    it('prints the JSON describing the full repository', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/repos/arui-feather',
        params: [Command.DUMP, '--config="../../configs/arui-feather-uxpin.config.js"'],
      }).then((consoleOutput) => {
        // then
        expect(consoleOutput).toMatchSnapshot();
      });
    });
  });
});
