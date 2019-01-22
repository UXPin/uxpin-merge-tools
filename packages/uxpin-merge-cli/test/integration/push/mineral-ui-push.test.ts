import { Command } from '../../../src';
import { mineralUiServerStub } from '../../resources/stubs/mineralUi';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { startStubbyServer } from '../../utils/stubby/startStubbyServer';
import { stopStubbyServer } from '../../utils/stubby/stopStubbyServer';

const CURRENT_TIMEOUT:number = 75000;
const STUBBY_PORT:number = 7448;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

jest.mock('../../../src/program/utils/version/getToolVersion');

describe('Pushing mineral-ui design system', () => {
  let server:any;

  beforeAll(async () => {
    server = await startStubbyServer({
      data: mineralUiServerStub.requests,
      tls: STUBBY_PORT,
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
        `--uxpin-domain "0.0.0.0:${STUBBY_PORT}"`,
        `--uxpin-api-domain "0.0.0.0:${STUBBY_PORT}"`,
      ];

      consoleOutput = await runUXPinMergeCommand({ cwd: 'resources/repos/mineral-ui', params });
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
        `--uxpin-domain "0.0.0.0:${STUBBY_PORT}"`,
        `--uxpin-api-domain "0.0.0.0:${STUBBY_PORT}"`,
      ];

      await expect(runUXPinMergeCommand({ cwd: 'resources/repos/mineral-ui', params }))
        .rejects.toMatch('Module parse failed: Unexpected token');
    });
  });
});
