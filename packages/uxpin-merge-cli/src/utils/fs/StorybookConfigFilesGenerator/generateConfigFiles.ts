import { pathExists } from 'fs-extra';
import { resolve } from 'path';
import { STORYBOOK_CONFIG_FILE, STORYBOOK_DEFAULT_CONFIG_DIR } from '../../../common/constants';
import { RawProgramArgs } from '../../../program/args/ProgramArgs';

import { generateStoriesMap } from './generateStoriesMap';
import { generateUxpinConfigFile } from './generateUxpinConfigFile';

// We generate config files(uxpin.config.js and stories-map.json) based on stories in main.js
// stories-map.json file is useful for us to find stories file in later steps based on component path.
// e.g.(1) detect component name to import. (2) serialize story as preset for uxpin
export async function generateConfigFiles(args:RawProgramArgs):Promise<void> {
  const storybookConfigDir:string = args.storybookConfigDir || STORYBOOK_DEFAULT_CONFIG_DIR;
  const path:string = resolve(args.cwd, storybookConfigDir, STORYBOOK_CONFIG_FILE);
  const { stories } = require(path);
  await generateStoriesMap(stories);

  const uxpinConfigExists:boolean = await pathExists(resolve(args.cwd, args.config));
  if (!args.config || !uxpinConfigExists) { await generateUxpinConfigFile(stories); }
}
