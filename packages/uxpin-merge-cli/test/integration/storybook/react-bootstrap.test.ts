import { Command } from '../../../src';
import { Environment } from '../../../src/program/env/Environment';
import { mineralUiServerStub } from '../../resources/stubs/mineralUi';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { setupStubbyServer } from '../../utils/stubby/setupStubbyServer';

const CURRENT_TIMEOUT:number = 75000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('react-bootstrap-merge with storybook enabled', () => {

  describe('dump with storybook enabled', () => {
    it('succeeds', async () => {
      // Run UXPin merge to serve the local directory
      const consoleOutput = await runUXPinMergeCommand({
        cwd: 'resources/repos/react-bootstrap-build',
        params: [ Command.DUMP, '--storybook' ],
      });

      // Ensure that the output contains a success notification
      expect(consoleOutput).toContain("Compiled successfully! Now you can refresh your browser.");
    });
  });

  // describe('server with storybook enabled', () => {

  //   it('builds and serves properly', async () => {
  //     const params:string[] = [
  //       Command.SERVER,
  //       '--disable-tunneling',
  //       '--skip-browser',
  //       '--storybook',
  //     ];

  //     // Set up a listener to wait for the merge command to return the right line
  //     const listener = (line) => {
  //       // TODO: check that the line indicates a successful build

  //     };

  //      // Run UXPin merge to serve the local directory
  //      const consoleOutput = await runUXPinMergeCommand({
  //        cwd: 'resources/repos/react-bootstrap-build',
  //        params,
  //      });

  //      // then
  //      expect(consoleOutput).toInclude("Compiled successfully! Now you can refresh your browser.");

  //   });

  // });

});
