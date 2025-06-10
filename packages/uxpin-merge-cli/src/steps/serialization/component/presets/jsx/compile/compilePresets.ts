import debug from 'debug';
import { unlink } from 'fs-extra';
import { join, parse } from 'path';
import * as webpack from 'webpack';
import { ProgramArgs, RawProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { getProjectRoot } from '../../../../../../program/args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../../../../../program/args/providers/paths/getTempDirPath';
import { Compiler } from '../../../../../building/compiler/Compiler';
import { WebpackCompiler } from '../../../../../building/compiler/webpack/WebpackCompiler';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { createBundleSource } from '../bundle/createBundleSource';
import { generateVirtualModules, VirtualComponentModule } from './generateVirtualModules';
import { getPresetsBundleWebpackConfig } from './getPresetsBundleWebpackConfig';

const log = debug('uxpin:serialization:presets');

export async function compilePresets(programArgs: ProgramArgs, components: ComponentDefinition[]): Promise<string> {
  log('Create temporary bundle');
  const sourcePath: string = await createBundleSource(programArgs, components);
  log(`Compile presets with Webpack (${components.length} components)`);
  const bundlePath: string = await compileWithWebpack(programArgs, components, sourcePath);
  log('Compilation OK, delete temporary bundle');
  await unlink(sourcePath);

  return bundlePath;
}

async function compileWithWebpack(
  programArgs: ProgramArgs,
  components: ComponentDefinition[],
  sourcePath: string
): Promise<string> {
  const { base } = parse(sourcePath);
  const uxpinDirPath: string = getTempDirPath(programArgs);
  const bundlePath: string = join(uxpinDirPath, `__bundle__${base}`);
  const { webpackConfig } = programArgs as RawProgramArgs;
  const projectRoot: string = getProjectRoot(programArgs);
  const virtualModules: VirtualComponentModule[] = generateVirtualModules(components);

  const config: webpack.Configuration = getPresetsBundleWebpackConfig({
    bundlePath,
    projectRoot,
    sourcePath,
    virtualModules,
    webpackConfig,
  });

  // fix process variable - porsche issue
  if (config.plugins && Array.isArray(config.plugins)) {
    const definePlugin = config.plugins.find((plugin) => {
      if (plugin && plugin.constructor && plugin.constructor.name && plugin.constructor.name === 'DefinePlugin') {
        return true;
      }

      return false;
    });

    // @ts-ignore
    if (definePlugin && definePlugin.definitions && definePlugin.definitions.process) {
      // @ts-ignore
      definePlugin.definitions.process = `({ "browser": true })`;
    }
  }

  const compiler: Compiler = new WebpackCompiler(config);
  await compiler.compile();

  return bundlePath;
}
