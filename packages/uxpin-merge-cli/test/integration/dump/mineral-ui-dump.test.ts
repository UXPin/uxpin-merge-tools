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

jest.mock('../../../src/program/utils/version/getToolVersion');

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

  describe('run for the mineral-ui repository', () => {
    it('prints the JSON describing the full repository', async () => {
      // when
      const output:string = await runUXPinMergeCommand({
        cwd: 'resources/repos/mineral-ui',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${tlsPort}`,
          UXPIN_ENV: Environment.TEST,
        },
        params: [Command.DUMP],
      });

      // then
      expect(output).toMatchSnapshot();
    });
  });
});
