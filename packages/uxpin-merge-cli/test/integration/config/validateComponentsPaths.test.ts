import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupExperimentationServerTest, TestServerStatus } from '../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT:number = 300000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('validate components paths and globs declared in uxpin.config.js', () => {
  describe('valid', () => {
    const { getServerStatus } = setupExperimentationServerTest({
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--config "./uxpin.config.js"'],
      sourceDir: 'resources/designSystems/twoComponentsWithConfig',
    });

    it('should sucessfully run experimentation server', () => {
      expect(getServerStatus()).toBe(TestServerStatus.READY);
    });
  });

  describe('invalid', () => {
    const { getServerStatus } = setupExperimentationServerTest({
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--config "./uxpin.invalid.config.js"'],
      serverFailOutput: 'fix wrong patterns',
      sourceDir: 'resources/designSystems/twoComponentsWithConfig',
    });

    it('should not run experimentation server', () => {
      expect(getServerStatus()).toBe(TestServerStatus.FAILED);
    });
  });
});
