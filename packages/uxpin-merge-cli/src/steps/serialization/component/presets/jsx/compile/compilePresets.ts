import { unlink } from 'fs-extra';
import { join, parse } from 'path';
import * as webpack from 'webpack';
import { CreateAppProgramArgs, ProgramArgs, RawProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { getProjectRoot } from '../../../../../../program/args/providers/paths/getProjectRoot';
import { getTempDirPath } from '../../../../../../program/args/providers/paths/getTempDirPath';
import { Compiler } from '../../../../../building/compiler/Compiler';
import { WebpackCompiler } from '../../../../../building/compiler/webpack/WebpackCompiler';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { createBundleSource } from '../bundle/createBundleSource';
import { generateVirtualModules, VirtualComponentModule } from './generateVirtualModules';
import { getPresetsBundleWebpackConfig } from './getPresetsBundleWebpackConfig';

export async function compilePresets(
    programArgs:Exclude<ProgramArgs, CreateAppProgramArgs>,
    components:ComponentDefinition[],
):Promise<string> {
  const sourcePath:string = await createBundleSource(programArgs, components);
  const bundlePath:string = await compileWithWebpack(programArgs, components, sourcePath);
  await unlink(sourcePath);

  return bundlePath;
}

async function compileWithWebpack(
  programArgs: Exclude<ProgramArgs, CreateAppProgramArgs>,
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
  const compiler: Compiler = new WebpackCompiler(config);
  await compiler.compile();

  return bundlePath;
}
