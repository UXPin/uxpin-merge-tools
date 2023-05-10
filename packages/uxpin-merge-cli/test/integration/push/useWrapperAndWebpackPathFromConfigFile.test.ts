import { resolve } from 'path';
import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { expectBundleToContain } from '../../utils/bundle/expectBundleToContain';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';
import { setupTempProject } from '../../utils/temp/setupTempProject';

const CURRENT_TIMEOUT = 60000;

describe('use wrapper and webpack path from config file', () => {
  const sourceDir: string = resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig');
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub, CURRENT_TIMEOUT);
  const { getDirectory } = setupTempProject({ sourceDir, gitOptions: { initialise: true }, timeout: CURRENT_TIMEOUT });

  describe('when wrapper path is specified in uxpin config', () => {
    let projectPath: string;

    beforeAll(async () => {
      projectPath = getDirectory().path;

      await runUXPinMergeCommand({
        cwd: projectPath,
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.PUSH, '--config "./uxpin.withCliFlags.config.js"', '--token DUMMY_TOKEN'],
      });
    }, CURRENT_TIMEOUT);

    it(
      'is uses wrapper component from path given in config',
      async () => {
        // then
        await expectBundleToContain(projectPath, '__MY_CUSTOM_WRAPPER_COMPONENT_IS_HERE__');
      },
      CURRENT_TIMEOUT
    );

    it(
      'uses webpack config defined in uxpin.config file',
      async () => {
        // then
        await expectBundleToContain(projectPath, '__MY_CUSTOM_BANNER_ADDED_BY_WEBPACK_');
      },
      CURRENT_TIMEOUT
    );
  });
});
