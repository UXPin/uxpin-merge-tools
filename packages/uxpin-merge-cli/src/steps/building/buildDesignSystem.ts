import { mkdtemp, pathExists } from 'fs-extra';
import { tmpdir } from 'os';
import { join as joinPath } from 'path';

import { execAsync } from '../../utils/child_process/execAsync';
import { logger } from '../../utils/logger';
import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { BuildOptions } from './BuildOptions';
import { getCompiler } from './compiler/getCompiler';
import { createComponentsLibrary } from './library/createComponentsLibrary';
import { LIBRARY_OUTPUT_FILENAME, TEMP_DIR_PATH } from './config/getConfig';

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
    const uxpinDirPath:string = joinPath(projectRoot, TEMP_DIR_PATH);
    const storybookOutputPath:string = joinPath(uxpinDirPath, 'merge-cli-storybook-build');
    const cmd:string = `${sbBuildBin} -o ${storybookOutputPath} --docs`;
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
