import { Command } from '../../../src';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';

const CURRENT_TIMEOUT:number = 75000;

setTimeoutBeforeAll(CURRENT_TIMEOUT);

describe('react-bootstrap-merge with storybook enabled', () => {

  beforeAll(async () => {
    // TODO: Add storybook preset locally (copied locally)
    // TODO: Overwrite storybook configuration file
    // TODO: Overwrite uxpin config file
  });

  describe('dump with storybook enabled', async () => {
    it('succeeds', async () => {
      // Run UXPin merge to serve the local directory
      const consoleOutput:string = await runUXPinMergeCommand({
        cwd: 'resources/repos/react-bootstrap-merge',
        params: [Command.DUMP, '--storybook'],
      });

      expect(consoleOutput).toContain('"dirPath": "src/Button",');
    });
  });

  describe('storybook build with uxpin preset', async () => {
    it('succeeds ', async () => {
      // TODO: run build-storybook (UXPin not involved)
      // TODO: check for the generated storybook configuration in .uxpin-merge/
    });
  });

  // describe('server run with storybook enabled', () => {
  //   it('succeeds', async () => {
  //     const params:string[] = [
  //       Command.SERVER,
  //       '--disable-tunneling',
  //       '--skip-browser',
  //       '--storybook',
  //     ];

  //     // TODO: Start uxpin server
  //     // Start uxpin server

  //     // Set up a listener to wait for the merge command to return the right line
  //     const listener = (line) => {
  //       // TODO: check that the line indicates a successful build

  //     };

  //      // Run UXPin merge to serve the local directory
  //      const consoleOutput = await runUXPinMergeCommand({
  //        cwd: 'resources/repos/react-bootstrap-merge',
  //        params,
  //      });

  //      // then
  //      expect(consoleOutput).toInclude("Compiled successfully! Now you can refresh your browser.");

  //   });

  // });

});
