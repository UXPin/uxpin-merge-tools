import { resolve } from 'path';
import { DirectoryResult } from 'tmp-promise';
import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { unexpectedComponentRemoval } from '../../resources/stubs/unexpectedComponentRemoval';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';
import { setupTempProject } from '../../utils/temp/setupTempProject';

const CURRENT_TIMEOUT:number = 60000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Push command', () => {
  const sourceDir:string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
  const { getTlsPort } = setupStubbyServer(unexpectedComponentRemoval);
  const { getDirectory } = setupTempProject({ sourceDir, gitOptions: { initialise: true } });

  describe('when API responded with BAD_REQUEST and appropriate errorCode of unexpected component removal', () => {
    it('shows error and `--force` flag info', async () => {
      // having
      const dir:DirectoryResult = getDirectory();

      // when
      // then
      expect.assertions(1);
      try {
        await runUXPinMergeCommand({
          cwd: dir.path,
          env: {
            UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
            UXPIN_ENV: Environment.TEST,
          },
          params: [
            Command.PUSH,
            '--webpack-config "./webpack.config.js"',
            '--token DUMMY_TOKEN',
          ],
        });
      } catch (error) {
        expect(error.stderr).toMatch(`Push failed
You can’t make this push because removing the following components may break the prototypes made in UXPin.

src/Card/Card.js

If you need to push these changes, confirm it by adding the \`--force\` flag to the \`push\` command.`);
      }
    });
  });
});
