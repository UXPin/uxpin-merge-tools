import { resolve } from 'path';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import {
  setupExperimentationServerTest,
  TestServerStatus,
} from '../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 30000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('validate components paths and globs declared in uxpin.config.js', () => {
  describe('valid', () => {
    const { getServerStatus } = setupExperimentationServerTest({
      projectPath: resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig'),
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--config "./uxpin.config.js"'],
    });

    it('should sucessfully run experimentation server', () => {
      expect(getServerStatus()).toBe(TestServerStatus.READY);
    });
  });

  describe('invalid', () => {
    const { getServerStatus } = setupExperimentationServerTest({
      projectPath: resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig'),
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--config "./uxpin.invalid.config.js"'],
      serverFailOutput: 'fix wrong patterns',
    });

    it('should not run experimentation server', () => {
      expect(getServerStatus()).toBe(TestServerStatus.FAILED);
    });
  });
});
