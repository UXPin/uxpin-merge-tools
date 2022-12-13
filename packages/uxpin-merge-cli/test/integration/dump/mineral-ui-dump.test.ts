import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT = 60000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

jest.mock('../../../src/program/utils/version/getToolVersion');

describe('The dump command', () => {
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub);

  describe('run for the mineral-ui repository', () => {
    it('prints the JSON describing the full repository', async () => {
      // when
      const output: string = await runUXPinMergeCommand({
        cwd: 'resources/repos/mineral-ui',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.DUMP, '--webpack-config "./webpack.config.js"'],
      });

      // then
      expect(JSON.parse(output)).toMatchSnapshot();
    });
  });
});
