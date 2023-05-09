import { resolve } from 'path';
import {
  setupExperimentationServerTest,
  TestServerStatus,
} from '../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 30000;

describe('validate components paths and globs declared in uxpin.config.js', () => {
  describe('valid', () => {
    const { getServerStatus } = setupExperimentationServerTest({
      projectPath: resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig'),
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--config "./uxpin.config.js"'],
      timeout: CURRENT_TIMEOUT,
    });

    it(
      'should sucessfully run experimentation server',
      () => {
        expect(getServerStatus()).toBe(TestServerStatus.READY);
      },
      CURRENT_TIMEOUT
    );
  });

  describe('invalid', () => {
    const { getServerStatus } = setupExperimentationServerTest({
      projectPath: resolve(__dirname, '../../resources/designSystems/twoComponentsWithConfig'),
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--config "./uxpin.invalid.config.js"'],
      serverFailOutput: 'fix wrong patterns',
      timeout: CURRENT_TIMEOUT,
    });

    it(
      'should not run experimentation server',
      () => {
        expect(getServerStatus()).toBe(TestServerStatus.FAILED);
      },
      CURRENT_TIMEOUT
    );
  });
});
