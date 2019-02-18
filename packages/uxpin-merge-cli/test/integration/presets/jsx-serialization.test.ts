import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 60000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

jest.mock('../../../src/program/utils/version/getToolVersion');

describe('The dump command', () => {
  describe('run for the `withPresets` design system', () => {
    it('prints the JSON including serialized presets', async () => {
      // given
      // when
      const output:string = await runUXPinMergeCommand({
        cwd: 'resources/designSystems/withPresets',
        params: [
          Command.DUMP,
          '--config "uxpin.config.js"',
          '--webpack-config "./webpack.config.js"',
        ],
      });

      // then
      expect(JSON.parse(output)).toMatchSnapshot({
        vcs: expect.objectContaining({
          branchName: expect.any(String),
          commitHash: expect.stringMatching(/[a-z0-9]+/),
        }),
      });
    });
  });
});
