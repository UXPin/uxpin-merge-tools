import { unlink } from 'fs-extra';
import { ProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { buildPresetsBundleWithWebpack } from '../../../presets/jsx/compile/buildPresetsBundleWithWebpack';
import { createBundleSource } from '../createBundleSource';

export async function compileStories(programArgs:ProgramArgs, components:ComponentDefinition[]):Promise<string> {
  const sourcePath:string = await createBundleSource(programArgs, components);
  const bundlePath:string = await buildPresetsBundleWithWebpack(programArgs, components, sourcePath);
  await unlink(sourcePath);

  return bundlePath;
}
