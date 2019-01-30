import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

jest.mock('../../../src/program/utils/version/getToolVersion');

xdescribe('The dump command', () => {
  describe('run for the nordnet-ui-kit repository', () => {
    it('prints the JSON describing the full repository', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/repos/nordnet-ui-kit',
        params: [Command.DUMP, '--config="../../configs/nordnet-ui-kit-uxpin.config.js"'],
      }).then((consoleOutput) => {
        // then
        expect(consoleOutput).toMatchSnapshot();
      });
    });
  });
});
