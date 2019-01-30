import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getRandomPortNumber } from '../../utils/e2e/server/getRandomPortNumber';
import { startStubbyServer } from '../../utils/stubby/startStubbyServer';
import { stopStubbyServer } from '../../utils/stubby/stopStubbyServer';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

// TODO: eventually turn off
describe('The dump command', () => {
  let tlsPort:number;
  let server:any;

  beforeAll(async () => {
    tlsPort = getRandomPortNumber();
    server = await startStubbyServer({
      admin: getRandomPortNumber(),
      data: emptyLatestCommitStub.requests,
      stubs: getRandomPortNumber(),
      tls: tlsPort,
    });
  });

  afterAll(async () => {
    await stopStubbyServer(server);
  });

  describe('run for the nordnet-ui-kit repository', () => {
    it('prints the JSON describing the full repository', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/repos/nordnet-ui-kit',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${tlsPort}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.DUMP, '--config="../../configs/nordnet-ui-kit-uxpin.config.js"'],
      }).then((consoleOutput) => {
        // then
        expect(consoleOutput).toMatchSnapshot();
      });
    });
  });
});
