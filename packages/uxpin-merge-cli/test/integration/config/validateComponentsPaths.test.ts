import { resolve } from 'path';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest } from '../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('validate components paths and globs declared in uxpin.config.js', () => {
  describe('valid', () => {
    const { getServerReady } = setupExperimentationServerTest({
      projectPath: resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig'),
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--config "./uxpin.config.js"'],
    });

    it('should sucessfully run experimentation server', () => {
      expect(getServerReady()).toBe(true);
    });
  });

  describe('invalid', () => {
    const { getServerReady } = setupExperimentationServerTest({
      projectPath: resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig'),
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--config "./uxpin.invalid.config.js"'],
      serverFailOutput: 'fix wrong patterns',
    });

    it('should not run experimentation server', () => {
      expect(getServerReady()).toBe(false);
    });
  });
});
