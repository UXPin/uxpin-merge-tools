import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { mineralUiServerStub } from '../../resources/stubs/mineralUi';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT:number = 75000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Pushing mineral-ui design system', () => {
  const { getTlsPort } = setupStubbyServer(mineralUiServerStub);

  describe('with required user webpack config', () => {
    let consoleOutput:string;

    it('prints warnings without stack traces to the console', async () => {
      const params:string[] = [
        Command.PUSH,
        '--webpack-config "./webpack.config.js"',
        '--wrapper "./src/library/themes/UXPinWrapper.js"',
        '--token DUMMY_TOKEN',
      ];

      consoleOutput = await runUXPinMergeCommand({
        cwd: 'resources/repos/mineral-ui',
        env: {
          UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
          UXPIN_ENV: Environment.TEST,
        },
        params,
      });

      // then
      expect(consoleOutput).toMatchSnapshot();
    });
  });

  describe('without required user webpack config', () => {
    it('throws an error', async () => {
      const params:string[] = [
        Command.PUSH,
      ];

      try {
        await  runUXPinMergeCommand({
          cwd: 'resources/repos/mineral-ui',
          env: {
            UXPIN_API_DOMAIN: `0.0.0.0:${getTlsPort()}`,
            UXPIN_ENV: Environment.TEST,
          },
          params,
        });
      } catch (error) {
        expect(error.stderr).toMatch('Module parse failed: Unexpected token');
      }
    });
  });
});
