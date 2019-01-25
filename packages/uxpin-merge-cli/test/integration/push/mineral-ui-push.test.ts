import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { mineralUiServerStub } from '../../resources/stubs/mineralUi';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { getRandomPortNumber } from '../../utils/e2e/server/getRandomPortNumber';
import { startStubbyServer } from '../../utils/stubby/startStubbyServer';
import { stopStubbyServer } from '../../utils/stubby/stopStubbyServer';

const CURRENT_TIMEOUT:number = 75000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Pushing mineral-ui design system', () => {
  let server:any;
  let tlsPort:number;

  beforeAll(async () => {
    tlsPort = getRandomPortNumber();
    server = await startStubbyServer({
      admin: getRandomPortNumber(),
      data: mineralUiServerStub.requests,
      tls: tlsPort,
      stubs: getRandomPortNumber(),
    });
  });

  afterAll(async () => {
    await stopStubbyServer(server);
  });

  describe('with required user webpack config', () => {
    let consoleOutput:string;

    beforeAll(async () => {
      const params:string[] = [
        Command.PUSH,
        '--webpack-config "./webpack.config.js"',
        '--wrapper "./src/library/themes/UXPinWrapper.js"',
        `--uxpin-domain "0.0.0.0:${tlsPort}"`,
      ];

      consoleOutput = await runUXPinMergeCommand({
        cwd: 'resources/repos/mineral-ui',
        env: {
          NODE_ENV: Environment.TEST,
          UXPIN_API_DOMAIN: `0.0.0.0:${tlsPort}`,
        },
        params,
      });
    });

    it('prints warnings without stack traces to the console', () => {
      // then
      expect(consoleOutput).toMatchSnapshot();
    });
  });

  describe('without required user webpack config', () => {
    it('throws an error', async () => {
      const params:string[] = [
        Command.PUSH,
        `--uxpin-domain "0.0.0.0:${tlsPort}"`,
      ];

      const consoleOutput:Promise<string> = runUXPinMergeCommand({
        cwd: 'resources/repos/mineral-ui',
        env: {
          NODE_ENV: Environment.TEST,
          UXPIN_API_DOMAIN: `0.0.0.0:${tlsPort}`,
        },
        params,
      });

      await expect(consoleOutput)
        .rejects.toMatch('Module parse failed: Unexpected token');
    });
  });
});
