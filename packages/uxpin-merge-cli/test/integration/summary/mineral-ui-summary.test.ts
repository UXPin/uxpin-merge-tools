import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { mineralUiSummaryStub } from '../../resources/stubs/mineralUi';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT = 60000;

describe('summary command integration', () => {
  const { getTlsPort } = setupStubbyServer(mineralUiSummaryStub, CURRENT_TIMEOUT);

  describe('summary command prints ', () => {
    it('prints the list of components found in mineral-ui example', async () => {
      // when
      const output: string = await runUXPinMergeCommand({
        cwd: 'resources/repos/mineral-ui',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.SUMMARY, '--webpack-config "./webpack.config.js"'],
      });

      // then
      expect(output).toMatchSnapshot();
    });
  });
});
