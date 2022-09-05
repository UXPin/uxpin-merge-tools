import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { polarisSummaryStub } from '../../resources/stubs/polaris';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT = 150000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('summary command integration', () => {
  const { getTlsPort } = setupStubbyServer(polarisSummaryStub);

  describe('summary command prints ', () => {
    it('prints the list of components found in polaris example', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/repos/polaris',
        env: {
          NODE_ENV: 'production',
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.SUMMARY],
      }).then((output) => {
        // then
        expect(output).toMatchSnapshot();
      });
    });
  });
});
