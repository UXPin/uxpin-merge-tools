import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { nordnetUiKitSummaryStub } from '../../resources/stubs/nordnetUiKit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT = 300000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('summary command integration', () => {
  const { getTlsPort } = setupStubbyServer(nordnetUiKitSummaryStub);

  describe('summary command prints ', () => {
    xit('prints the list of components found in nordnet-ui-kit example', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/repos/nordnet-ui-kit',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.SUMMARY, '--config="../../configs/nordnet-ui-kit-uxpin.config.js"'],
      }).then((output) => {
        // then
        expect(output).toMatchSnapshot();
      });
    });
  });
});
