import { emptyDir, pathExists, rmdir } from 'fs-extra';
import { join } from 'path';

import { Command } from '../../../src';
import { STORYBOOK_STORIES_MAP_PATH, STORYBOOK_UXPIN_CONFIG_PATH } from '../../../src/common/constants';
import { Environment } from '../../../src/program/env/Environment';
import { runUXPinMergeCommand } from '../../utils/command/runUXPinMergeCommand';
import { setTimeoutBeforeAll } from '../../utils/command/setTimeoutBeforeAll';
import { testDirPath } from '../../utils/resources/testDirPath';

import { TEMP_DIR_PATH } from '../../../src/steps/building/config/getConfig';

const CURRENT_TIMEOUT:number = 150000;
setTimeoutBeforeAll(CURRENT_TIMEOUT);

const PROJECT_DIR:string = join(testDirPath, 'resources/repos/storybook-design-system');
const UXPIN_TEMP_DIR:string = join(PROJECT_DIR, TEMP_DIR_PATH);

describe('generates uxpin.config.js and/or componentsStoriesMap.js based on .storybook/main.js', () => {
  describe('With dump command', () => {

    beforeEach(async () => {
      if (await pathExists(UXPIN_TEMP_DIR)) {
        await emptyDir(UXPIN_TEMP_DIR);
        await rmdir(UXPIN_TEMP_DIR);
      }
    });

    describe('with --config option', () => {
      it('generates only componentsStoriesMap.js', async () => {
        await runUXPinMergeCommand({
          cwd: 'resources/repos/storybook-design-system',
          env: {
            UXPIN_ENV: Environment.TEST,
          },
          params: [
            Command.DUMP,
            '--storybook',
            '--config="./uxpin.config.js"',
          ],
        });

        const storiesMap:any = require(join(PROJECT_DIR, STORYBOOK_STORIES_MAP_PATH));
        expect(storiesMap).toMatchSnapshot();
        expect(await pathExists(join(PROJECT_DIR, STORYBOOK_UXPIN_CONFIG_PATH))).toBeFalsy();
      });
    });
    describe('without --config option', () => {
      it('generates both uxpin.config.js and componentsStoriesMap.js', async () => {
        await runUXPinMergeCommand({
          cwd: 'resources/repos/storybook-design-system',
          env: {
            UXPIN_ENV: Environment.TEST,
          },
          params: [
            Command.DUMP,
            '--storybook',
          ],
        });

        const uxpinConfig:any = require(join(PROJECT_DIR, STORYBOOK_UXPIN_CONFIG_PATH));
        const storiesMap:any = require(join(PROJECT_DIR, STORYBOOK_STORIES_MAP_PATH));
        expect(uxpinConfig).toMatchSnapshot();
        expect(storiesMap).toMatchSnapshot();
      });
    });
  });
});
