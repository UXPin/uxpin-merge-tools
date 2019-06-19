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

  describe('run for the `withCorruptedPresets` design system', () => {
    it('prints error about unresolved path', async () => {
      expect.assertions(1);

      // given
      // when
      try {
        await runUXPinMergeCommand({
          cwd: 'resources/designSystems/withCorruptedPresets',
          params: [
            Command.DUMP,
            '--config ./uxpin.config.avatar.js',
            '--webpack-config "./webpack.config.js"',
          ],
        });
      } catch (error) {
        expect(error.stderr).toMatch(/Can\'t resolve \'\.\.\/NonExistingFileWithAvatarComponent\'/gm);
      }
    });

    it('prints error about unresolved import', async () => {
      // tslint:disable-next-line:no-magic-numbers
      expect.assertions(2);

      // given
      // when
      try {
        await runUXPinMergeCommand({
          cwd: 'resources/designSystems/withCorruptedPresets',
          params: [
            Command.DUMP,
            '--config ./uxpin.config.button.js',
            '--webpack-config "./webpack.config.js"',
          ],
        });
      } catch (error) {
        expect(error.stderr).toMatch(/Unknown component/gm);
        expect(error.stderr).toMatch(/src\/components\/Button\/presets\/1-corrupted-import\.jsx/gm);
      }
    });
  });
});
