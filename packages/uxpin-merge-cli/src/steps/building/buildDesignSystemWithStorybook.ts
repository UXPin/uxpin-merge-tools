import { pathExists } from 'fs-extra';
import * as path from 'path';
import { Configuration } from 'webpack';

import { BuildProgramArgs, getBuildOptions } from '../../program/command/push/getBuildOptions';
import { bundle } from './buildDesignSystem';
import { BuildOptions } from './BuildOptions';
import { LIBRARY_INPUT_FILENAME, TEMP_DIR_PATH } from './config/getConfig';

// This function is expected to be called from @uxpin/merge-storybook-preset-addon
// at storybook build to leverage their webpack configuration.
// The push flow will look something like like below
// 1) npx uxpin-merge push
// 2) npx build-storybook (executed from buildDesignSystem.ts)
// 3) call buildDesignSystemWithStorybook via @uxpin/merge-storybook-preset-addon storybook addon
// 4) upload the bundle to uxpin.
export async function buildDesignSystemWithStorybook(storybookConfig:Configuration):Promise<void> {
  const buildProgramArgs:BuildProgramArgs = {
    cwd: process.cwd(),
    storybook: true,
    storybookWebpackConfig: storybookConfig,
  };
  const buildOption:BuildOptions = getBuildOptions(buildProgramArgs);

  // LIBRARY_INPUT_FILENAME(components.js) needs to exist to bundle js.
  // It is generated with "createComponentsLibrary" when you run uxpin-merge command.
  // but because this can be called from storybook command, it is possible the file still doesn't exist
  const componentsFilePath:string = path.join(buildOption.projectRoot, TEMP_DIR_PATH, LIBRARY_INPUT_FILENAME);
  const componetsFileExsits:boolean = await pathExists(componentsFilePath);
  if (componetsFileExsits) {
    await bundle(buildOption);
  }
}
