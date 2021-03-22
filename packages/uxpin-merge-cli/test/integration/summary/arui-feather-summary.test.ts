import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { aruiFeatherSummaryStub } from '../../resources/stubs/aruiFeather';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT:number = 30000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('summary command integration', () => {
  const { getTlsPort } = setupStubbyServer(aruiFeatherSummaryStub);

  describe('summary command prints ', () => {
    it('prints the list of components found in arui-feather example', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/repos/arui-feather',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [
          Command.SUMMARY,
          '--config="../../configs/arui-feather-uxpin.config.js"',
        ],
      }).then((output) => {
        // then
        expect(output).toMatchSnapshot();
      });
    });
  });
});
