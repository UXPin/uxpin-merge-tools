import { pathExists } from 'fs-extra';
import globby = require('globby');
import { join, relative, resolve } from 'path';
import { STORYBOOK_CONFIG_FILE, STORYBOOK_DEFAULT_CONFIG_DIR } from '../../../common/constants';
import { RawProgramArgs } from '../../../program/args/ProgramArgs';
import { generateComponentsStoriesMapFile } from './generateComponentsStoriesMapFile';
import { generateUxpinConfigFile } from './generateUxpinConfigFile';
import { getComponentsFromStories } from './getComponentsFromStories';
import { StoriesInfo } from './getStoriesInfo';

// We generate config files(uxpin.config.js and stories-map.json) based on stories in main.js
// stories-map.json file is useful for us to find stories file in later steps based on component path.
// e.g.(1) detect component name to import. (2) serialize story as preset for uxpin
export async function generateConfigFilesFromStorybookConfig(args:RawProgramArgs):Promise<void> {
  // storybookConfigDir and cwd should be set following default in `getProgramArgs`.
  // But this is called before we call `getProgramArgs`, so setting default here.
  const storybookConfigDir:string = args.storybookConfigDir || STORYBOOK_DEFAULT_CONFIG_DIR;
  const cwd:string = args.cwd || process.cwd();

  const path:string = resolve(cwd, storybookConfigDir, STORYBOOK_CONFIG_FILE);
  let { stories } = require(path);

  stories = stories.map((filePattern:string) => relative(cwd, join(storybookConfigDir, filePattern)));
  const storiesPaths:string[] = await globby(stories, { cwd });
  const storiesInfos:StoriesInfo[] = await getComponentsFromStories(storiesPaths);
  await generateComponentsStoriesMapFile(cwd, storiesInfos);

  // // If config is specified, skip generating uxpin.config.js
  if (!args.config || !(await pathExists(resolve(cwd, args.config)))) {
    await generateUxpinConfigFile(cwd, storiesInfos);
  }
}
