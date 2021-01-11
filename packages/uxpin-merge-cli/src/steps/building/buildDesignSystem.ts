import { existsSync } from 'fs';
import { merge as webpackMerge } from 'webpack-merge';
import { join as joinPath } from 'path';

import { ComponentDefinition } from '../serialization/component/ComponentDefinition';
import { BuildOptions } from './BuildOptions';
import { getCompiler } from './compiler/getCompiler';
import { createComponentsLibrary } from './library/createComponentsLibrary';
import { execAsync } from '../../utils/child_process/execAsync';

import { path as appRootPath } from 'app-root-path';

export async function buildDesignSystem(components:ComponentDefinition[], options:BuildOptions):Promise<void> {
  await createComponentsLibrary(components, options);

  if (options && options.storybook && !options.storybookWebpackConfigPath) {

    // Figure out the root directory
    const projectRoot = options.projectRoot;
    if (!projectRoot) {
      throw new Error("Object root path unexpectedly missing");
    }
    console.log(`Project root @ [${projectRoot}]`);

    // Ensure storybook binary bin exists where we expect it to be
    const sbBuildBin = `${projectRoot}/node_modules/.bin/build-storybook`;
    if (!existsSync(sbBuildBin)) {
      throw new Error(`Failed to find expected Storybook binary @ expected location [${sbBuildBin}]`);
    }
    console.log(`Found Storybook binary @ [${sbBuildBin}]`);

    // TODO: ensure the uxpin preset addon is present

    // Run a storybook build with the preset installed, which *should* generate
    // <project>/.uxpin-merge/storybook.webpack.config.js
    const tmpPath = '/tmp/storybook-test'; // TODO: make a reasonable tmp path
    const cmd = `${sbBuildBin} -o ${tmpPath} --docs`;
    console.log(`Running storybook with command [${cmd}]`);
    await execAsync(cmd);
    console.log(`Finished running storybook`);

    // TODO: paths on windows? need to use os.path
    const expectedConfigRelPath = joinPath('.uxpin-merge', 'storybook.webpack.config.js');
    const sbWebpackConfigPath = joinPath(projectRoot, expectedConfigRelPath);
    if (!existsSync(sbWebpackConfigPath)) {
      throw new Error(`Failed to find expected UXPin Storybook addon generated artifact @ [${sbWebpackConfigPath}]`);
    }
    console.log(`Found expected generated Storybook webpack config @ [${sbWebpackConfigPath}]`);

    // Merge the options into the webpack options we have
    const sbWebpackConfig = require(sbWebpackConfigPath);

    // See: steps/building/config/getConfig.ts
    options.storybookWebpackConfigPath = expectedConfigRelPath;
    // TODO: .uxpin-merge/storybook.webpack.config.js could just be the default value...
    console.log(`set storybookWebpackConfigPath to [${expectedConfigRelPath}]`);

    // normally this *SHOULD* work but we'll fake it for now
    // (could also find this by getting dirname of project, or using a utility)

    // TODO: uxpin-merge
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
