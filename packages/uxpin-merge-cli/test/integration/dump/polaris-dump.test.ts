import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT:number = 120000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

jest.mock('../../../src/program/utils/version/getToolVersion');

// @todo #20210: Fix this test after finish of TypeScript support implementation
describe('The dump command', () => {
  const { getTlsPort } = setupStubbyServer(emptyLatestCommitStub);

  it('run for the polaris repository, prints the JSON describing the full repository', () => {
    // when
    return runUXPinMergeCommand({
      cwd: 'resources/repos/polaris',
      env: {
        UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
        UXPIN_ENV: Environment.TEST,
      },
      params: [Command.DUMP],
    }).then((consoleOutput) => {
      // then
      expect(JSON.parse(consoleOutput)).toMatchSnapshot();
    });
  });
});
