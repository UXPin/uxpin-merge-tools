import { Command } from '../../../src';
import { emptyLatestCommitStub } from '../../resources/stubs/emptyLatestCommit';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { startStubbyServer } from '../../utils/stubby/startStubbyServer';
import { stopStubbyServer } from '../../utils/stubby/stopStubbyServer';

const CURRENT_TIMEOUT:number = 15000;
const STUBBY_PORT:number = 7449;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('summary command integration', () => {
  let server:any;

  beforeAll(async () => {
    server = await startStubbyServer({
      data: emptyLatestCommitStub.requests,
      tls: STUBBY_PORT,
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
        params: [
          Command.SUMMARY,
          `--uxpin-api-domain="0.0.0.0:${STUBBY_PORT}"`,
        ],
      }).then((output) => {
        // then
        expect(output).toContain('uxpin.config.js\' not found. Using default configuration.');
      });
    });
  });
});
