import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getRandomPortNumber } from '../../utils/e2e/server/getRandomPortNumber';
import { startStubbyServer, TLS_PORT_RANGE, ADMIN_PORT_RANGE, STUBS_PORT_RANGE } from '../../utils/stubby/startStubbyServer';
import { stopStubbyServer } from '../../utils/stubby/stopStubbyServer';

const CURRENT_TIMEOUT:number = 15000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('summary command integration', () => {
  let server:any;
  let tlsPort:number = getRandomPortNumber(TLS_PORT_RANGE.min, TLS_PORT_RANGE.max);

  beforeAll(async () => {
    server = await startStubbyServer({
      admin: getRandomPortNumber(ADMIN_PORT_RANGE.min, ADMIN_PORT_RANGE.max),
      data: emptyLatestCommitStub.requests,
      stubs: getRandomPortNumber(STUBS_PORT_RANGE.min, STUBS_PORT_RANGE.max),
      tls: tlsPort,
    });
  });

  afterAll(async () => {
    await stopStubbyServer(server);
  });

  describe('summary command prints ', () => {
    it('prints a info when there`s no config file in the project', () => {
      // when
      return runUXPinMergeCommand({
        cwd: 'resources/designSystems/noSrcDir',
        env: {
          NODE_ENV: Environment.TEST,
          UXPIN_API_DOMAIN: `0.0.0.0:${tlsPort}`,
        },
        params: [
          Command.SUMMARY,
        ],
      }).then((output) => {
        // then
        expect(output).toContain('uxpin.config.js\' not found. Using default configuration.');
      });
    });
  });
});
