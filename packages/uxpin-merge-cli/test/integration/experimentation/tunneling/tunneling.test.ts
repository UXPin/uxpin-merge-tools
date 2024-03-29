import { resolve } from 'path';
import {
  setupExperimentationServerTest,
  TestServerStatus,
} from '../../../utils/experimentation/setupExperimentationServerTest';

const CURRENT_TIMEOUT = 30000;

describe('uxpin-merge runs experimental mode', () => {
  describe('without tunneling', () => {
    const { getExperimentationUrl, getServerStatus } = setupExperimentationServerTest({
      projectPath: resolve(__dirname, '../../../resources/designSystems/twoComponentsWithConfig'),
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--config "./uxpin.config.js"', '--disable-tunneling'],
      timeout: CURRENT_TIMEOUT,
    });

    it('should sucessfully run experimentation server', () => {
      expect(getServerStatus()).toBe(TestServerStatus.READY);
    });

    it('should provide correct experimentation url in terminal', () => {
      expect(getExperimentationUrl()).toMatch(/experiment\/([a-z0-9\-\_]+)\?port\=[\d]+$/);
    });
  });

  describe('with tunneling', () => {
    const { getServerStatus, getExperimentationUrl } = setupExperimentationServerTest({
      projectPath: 'resources/designSystems/twoComponentsWithConfig',
      serverCmdArgs: ['--webpack-config "./webpack.config.js"', '--config "./uxpin.config.js"'],
      timeout: CURRENT_TIMEOUT,
    });

    it('should sucessfully run experimentation server', () => {
      expect(getServerStatus()).toBe(TestServerStatus.READY);
    });

    it('should provide correct experimentation url in terminal', () => {
      expect(getExperimentationUrl()).toMatch(/experiment\/([a-z0-9\-\_]+)\?ngrok_session\=sessionId$/);
    });
  });
});
