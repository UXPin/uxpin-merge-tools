import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT = 15000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('summary command integration', () => {
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub);

  describe('summary command prints ', () => {
    it('prints a info when there`s no config file in the project', async () => {
      try {
        // when
        await runUXPinMergeCommand({
          cwd: 'resources/designSystems/noUxpinConfig',
          env: {
            UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
            UXPIN_ENV: Environment.TEST,
          },
          params: [Command.SUMMARY],
        });
      } catch (error) {
        // then
        expect(error.stdout).toContain("uxpin.config.js' not found. Using default configuration.");
      }
    });
  });
});
