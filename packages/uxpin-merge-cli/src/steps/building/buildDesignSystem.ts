import { pathExists } from 'fs-extra';
import { join as joinPath } from 'path';

import { STORYBOOK_BUILD_ENV, STORYBOOK_DEFAILT_CONFIG_DIR, STORYBOOK_OUTPUT_DIR } from '../../common/constants';
import { execAsync } from '../../utils/child_process/execAsync';
import { logger } from '../../utils/logger';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { BuildOptions } from './BuildOptions';
import { getCompiler } from './compiler/getCompiler';
import { LIBRARY_OUTPUT_FILENAME, TEMP_DIR_PATH } from './config/getConfig';
import { createComponentsLibrary } from './library/createComponentsLibrary';

export async function buildDesignSystem(components:ComponentDefinition[], options:BuildOptions):Promise<void> {
  await createComponentsLibrary(components, options);

  // For storybook, we'll build DS via storybook addon @uxpin/merge-storybook-preset-addon
  // to leverage their webpack configuration
  if (options && options.storybook) {
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
    // <project>/.uxpin-merge/bundle.js
    const uxpinDirPath:string = joinPath(projectRoot, TEMP_DIR_PATH);
    const storybookOutputPath:string = joinPath(uxpinDirPath, STORYBOOK_OUTPUT_DIR);
    const storybookConfigDir:string = `--config-dir ${options.storybookConfigDir || STORYBOOK_DEFAILT_CONFIG_DIR}`;
    console.log(options.storybookConfigDir);
    const cmd:string = `${STORYBOOK_BUILD_ENV} ${sbBuildBin} -o ${storybookOutputPath} ${storybookConfigDir}`;
    logger.debug(`Running storybook with command [${cmd}]`);
    await execAsync(cmd);
    logger.debug(`Finished running storybook`);

    const bundleExists:boolean = await pathExists(joinPath(uxpinDirPath, LIBRARY_OUTPUT_FILENAME));
    if (!bundleExists) {
      throw new Error(`Failed to find expected UXPin Storybook addon generated artifact @ [${uxpinDirPath}]`);
    }
    logger.debug(`Found expected generated ${LIBRARY_OUTPUT_FILENAME} by storybook addon @ [${uxpinDirPath}]`);
  } else {
    await bundle(options);
  }
}

export function bundle(options:BuildOptions):Promise<void> {
  setNodeEnvironment(options.development);
  return getCompiler(options).compile();
}

function setNodeEnvironment(development:boolean = false):void {
  process.env.NODE_ENV = development ? 'development' : 'production';
}
