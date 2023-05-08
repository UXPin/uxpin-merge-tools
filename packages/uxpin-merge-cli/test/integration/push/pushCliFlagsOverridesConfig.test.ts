import { resolve } from 'path';
import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { expectBundleToContain } from '../../utils/bundle/expectBundleToContain';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';
import { setupTempProject } from '../../utils/temp/setupTempProject';

const CURRENT_TIMEOUT = 60000;

describe('push cli flags overrides config', () => {
  const sourceDir: string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub, CURRENT_TIMEOUT);
  const { getDirectory } = setupTempProject({ sourceDir, gitOptions: { initialise: true }, timeout: CURRENT_TIMEOUT });

  describe(
    'when wrapper path, webpack config path or uxpin domain is specified in uxpin config,' +
      ' but they are also specified as a CLI flags',
    () => {
      it('the CLI flags takes precedence over the values specified in the uxpin.config.js file', async () => {
        // given
        const projectPath: string = getDirectory().path;

        // when
        await runUXPinMergeCommand({
          cwd: projectPath,
          env: {
            UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
            UXPIN_ENV: Environment.TEST,
          },
          params: [
            Command.PUSH,
            '--config "./uxpin.invalidFlags.config.js"',
            '--webpack-config "./webpack.config.js"',
            '--wrapper "./src/components/WrapperComponent.ts"',
            '--token DUMMY_TOKEN',
          ],
        });

        // then
        await expectBundleToContain(projectPath, '__MY_CUSTOM_WRAPPER_COMPONENT_IS_HERE__');
      });
    }
  );
});
