import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 75000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('Pushing mineral-ui design system', () => {
  describe('with required user webpack config', () => {
    let consoleOutput:string;

    beforeAll(async () => {
      const params:string[] = [
        'push',
        '--webpack-config "./webpack.config.js"',
        '--wrapper "./src/library/themes/UXPinWrapper.js"',
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
      await expect(runUXPinMergeCommand({ cwd: 'resources/repos/mineral-ui', params: ['push'] }))
        .rejects.toMatch('Module parse failed: Unexpected token');
    });
  });
});
