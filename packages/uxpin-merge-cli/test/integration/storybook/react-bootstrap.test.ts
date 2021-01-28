import { ChildProcess } from 'child_process';
import { copy, ensureDir, pathExists } from 'fs-extra';
import { join as joinPath, resolve as resolvePath } from 'path';

import { Command } from '../../../src';
import { execAsync } from '../../../src/utils/child_process/execAsync';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { spawnUXPinMergeCommand } from '../../utils/command/spawnUXPinMergeCommand';

const PRESET_JS_PATH:string = resolvePath(
  joinPath(__dirname, '../../../../uxpin-merge-storybook-preset-addon/preset.js'),
);
const PROJECT_ROOT_PATH:string = resolvePath(joinPath(__dirname, '../../resources/repos/react-bootstrap-merge'));

const STORYBOOK_CONFIG_DIR_PATH:string = joinPath(PROJECT_ROOT_PATH, '.storybook');
const STORYBOOK_CONFIG_FIXTURE_PATH:string = resolvePath(joinPath(__dirname, './fixtures/storybook-main-config.js'));
const UXPIN_CONFIG_FIXTURE_PATH:string = resolvePath(joinPath(__dirname, './fixtures/uxpin-config.js'));
const BUTTON_STORY_FIXTURE_PATH:string = resolvePath(joinPath(__dirname, './fixtures/Button.stories.js'));
const UXPIN_WEBPACK_CONFIG_FIXTURE_PATH:string = resolvePath(joinPath(__dirname, './fixtures/uxpin-webpack-config.js'));

const INSTALLED_PRESET_JS_PATH:string = joinPath(PROJECT_ROOT_PATH, '.storybook/uxpin-storybook.js');
const INSTALLED_STORYBOOK_CONFIG_FILE_PATH:string = joinPath(PROJECT_ROOT_PATH, '.storybook/main.js');
const INSTALLED_UXPIN_CONFIG_FILE_PATH:string = joinPath(PROJECT_ROOT_PATH, 'uxpin.config.js');
const INSTALLED_UXPIN_WEBPACK_CONFIG_FILE_PATH:string = joinPath(PROJECT_ROOT_PATH, 'uxpin.webpack.config.js');
const INSTALLED_BUTTON_STORY_FILE_PATH:string = joinPath(PROJECT_ROOT_PATH, 'src/Button/Button.stories.js');

const GENERATED_WEBPACK_CONFIG_PATH:string = joinPath(PROJECT_ROOT_PATH, '.uxpin-merge/storybook.webpack.config.js');

const MERGE_COMMAND_SUCCESS_LINE:string = 'server started successfully!';

const TIMEOUT_MS:number = 750000;
setTimeoutBeforeAll(TIMEOUT_MS);

describe('react-bootstrap-merge with storybook enabled', () => {
  const processes:ChildProcess[] = [];

  beforeAll(async () => {
    // Ensure the storybook configuration folder exists
    await ensureDir(STORYBOOK_CONFIG_DIR_PATH);

    // Copy the preset into the already initialized storybook directory
    await copy(PRESET_JS_PATH, INSTALLED_PRESET_JS_PATH);

    // Copy the storybook configuration fixture in
    await copy(STORYBOOK_CONFIG_FIXTURE_PATH, INSTALLED_STORYBOOK_CONFIG_FILE_PATH);

    // Copy the modified uxpin config fixture in
    await copy(UXPIN_CONFIG_FIXTURE_PATH, INSTALLED_UXPIN_CONFIG_FILE_PATH);

    // Copy the modified uxpin webpack config fixture in
    await copy(UXPIN_WEBPACK_CONFIG_FIXTURE_PATH, INSTALLED_UXPIN_WEBPACK_CONFIG_FILE_PATH);

    // Copy the modified Button.stories file to where it should be
    await copy(BUTTON_STORY_FIXTURE_PATH, INSTALLED_BUTTON_STORY_FILE_PATH);
  });

  afterAll(() => {
    // Kill all possibly leftover child processes
    processes.forEach((p) => p.kill());
  });

  describe('dump with storybook enabled (Button)', async () => {
    it('succeeds', async () => {
      // Run UXPin merge to serve the local directory
      const consoleOutput:string = await runUXPinMergeCommand({
        cwd: 'resources/repos/react-bootstrap-merge',
        params: [Command.DUMP, '--storybook'],
      });

      // Ensure the output contains both the dir path and the Button story
      expect(consoleOutput).toContain('"dirPath": "src/Button"');
      expect(consoleOutput).toContain('"path": "src/Button/Button.stories.js"');
    });
  });

  describe('storybook build with uxpin preset (Button)', async () => {
    it('succeeds', async () => {
      await execAsync('npx build-storybook', {
        cwd: PROJECT_ROOT_PATH,
      });

      // The preset which was installed should generate a webpack config in .uxpin-merge
      expect(await pathExists(GENERATED_WEBPACK_CONFIG_PATH));
    });
  });

  describe('server run with storybook enabled (Button)', () => {
    it('succeeds', async (done) => {
      // Spawn uxpin-merge in server mode, and wait until we see a successful build
      // Note that since the process doesn't ever actually exit, we must listen to it

      const childProcess:ChildProcess = await spawnUXPinMergeCommand({
        cwd: PROJECT_ROOT_PATH,
        params: [
          Command.SERVER,
          '--disable-tunneling',
          '--skip-browser',
          '--storybook',
        ],
      });
      expect(childProcess);

      // Keep track of the process in case of test failure
      processes.push(childProcess);

      // Set up a listener to the child process's stdout for the line that signifies success
      const listener:(line:string) => void = (line:string) => {
        if (!line) { return; }
        // Listen for the success line
        if (line.includes(MERGE_COMMAND_SUCCESS_LINE)) {
          childProcess.stdout.removeListener('data', listener);
          childProcess.kill();
          done();
        }
      };
      childProcess.stdout.on('data', listener);

      // Asynchronously, the the listener code will run and eventually find the command
    });

  });

});
