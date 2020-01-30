import { unlink } from 'fs-extra';
import { ProgramArgs } from '../../../../../program/args/ProgramArgs';
import { ComponentDefinition } from '../../ComponentDefinition';
import { PresetsBundle } from '../../presets/jsx/bundle/PresetsBundle';
import { unRequire } from '../../presets/jsx/bundle/unRequire';
import { compileStories } from './compile/compileStories';

export async function getStoriesBundle(
  programArgs:ProgramArgs,
  components:ComponentDefinition[],
):Promise<PresetsBundle> {
  const bundlePath:string = await compileStories(programArgs, components);
  const bundle:PresetsBundle = require(bundlePath);
  unRequire(bundlePath);
  await unlink(bundlePath);
  return bundle;
}
