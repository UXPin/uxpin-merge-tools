import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT = 30000;

describe('The dump command', () => {
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub, CURRENT_TIMEOUT);

  describe('run for the nordnet-ui-kit repository', () => {
    it(
      'prints the JSON describing the full repository',
      () => {
        // when
        return runUXPinMergeCommand({
          cwd: 'resources/repos/nordnet-ui-kit',
          env: {
            UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
            UXPIN_ENV: Environment.TEST,
          },
          params: [Command.DUMP, '--config="../../configs/nordnet-ui-kit-uxpin.config.js"'],
        }).then((consoleOutput) => {
          // then
          expect(JSON.parse(consoleOutput)).toMatchSnapshot({
            vcs: expect.objectContaining({
              branchName: 'master',
              commitHash: 'd914edd5f97cadb284f7f47b783106c86fe430d9',
              paths: {
                configPath: expect.stringMatching(
                  new RegExp('uxpin-merge-cli/test/resources/configs/nordnet-ui-kit-uxpin.config.js')
                ),
                projectRoot: expect.stringMatching(new RegExp('uxpin-merge-cli/test/resources/repos/nordnet-ui-kit')),
              },
            }),
          });
        });
      },
      CURRENT_TIMEOUT
    );
  });
});
