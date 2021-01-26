import { mkdtemp, pathExists } from 'fs-extra';
import { tmpdir } from 'os';
import { join as joinPath } from 'path';

import { execAsync } from '../../utils/child_process/execAsync';
import { logger } from '../../utils/logger';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { BuildOptions } from './BuildOptions';
import { getCompiler } from './compiler/getCompiler';
import { createComponentsLibrary } from './library/createComponentsLibrary';

export async function buildDesignSystem(components:ComponentDefinition[], options:BuildOptions):Promise<void> {
  await createComponentsLibrary(components, options);

  if (options && options.storybook && !options.storybookWebpackConfigPath) {

    // Figure out the root directory
    const projectRoot:string = options.projectRoot;
    if (!projectRoot) {
      throw new Error('Object root path unexpectedly missing');
    }
    logger.debug(`Project root @ [${projectRoot}]`);

    // Ensure storybook binary bin exists where we expect it to be
    const sbBuildBin:string = `${projectRoot}/node_modules/.bin/build-storybook`;
    const sbBuildBinExists:boolean = await pathExists(sbBuildBin);
    if (!sbBuildBinExists) {
      throw new Error(`Failed to find expected Storybook binary @ expected location [${sbBuildBin}]`);
    }
    logger.debug(`Found Storybook binary @ [${sbBuildBin}]`);

    // Run a storybook build with the preset installed, which *should* generate
    // <project>/.uxpin-merge/storybook.webpack.config.js
    const tmpPath:string = await mkdtemp(joinPath(tmpdir(), 'merge-cli-storybook-build-')).toString();
    const cmd:string = `${sbBuildBin} -o ${tmpPath} --docs`;
    logger.debug(`Running storybook with command [${cmd}]`);
    await execAsync(cmd);
    logger.debug(`Finished running storybook`);

    const expectedConfigRelPath:string = joinPath('.uxpin-merge', 'storybook.webpack.config.js');
    const sbWebpackConfigPath:string = joinPath(projectRoot, expectedConfigRelPath);
    const sbWebpackConfigPathExists:boolean = await pathExists(sbWebpackConfigPath);
    if (!sbWebpackConfigPathExists) {
      throw new Error(`Failed to find expected UXPin Storybook addon generated artifact @ [${sbWebpackConfigPath}]`);
    }
    logger.debug(`Found expected generated Storybook webpack config @ [${sbWebpackConfigPath}]`);

    // See: steps/building/config/getConfig.ts
    options.storybookWebpackConfigPath = expectedConfigRelPath;

    logger.debug(`set storybookWebpackConfigPath to [${expectedConfigRelPath}]`);
  }

  await bundle(options);
}

function bundle(options:BuildOptions):Promise<void> {
  setNodeEnvironment(options.development);

  return getCompiler(options).compile();
}

function setNodeEnvironment(development:boolean = false):void {
  process.env.NODE_ENV = development ? 'development' : 'production';
}
