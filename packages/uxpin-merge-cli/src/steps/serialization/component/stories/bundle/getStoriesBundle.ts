import { unlink } from 'fs-extra';
import { ProgramArgs } from '../../../../../program/args/ProgramArgs';
import { ComponentDefinition } from '../../ComponentDefinition';
import { unRequire } from '../../presets/jsx/bundle/unRequire';
import { compileStories } from './compile/compileStories';
import { StoriesBundle } from './StoriesBundle';

export async function getStoriesBundle(
  programArgs:ProgramArgs,
  components:ComponentDefinition[],
):Promise<StoriesBundle> {
  const bundlePath:string = await compileStories(programArgs, components);
  const bundle:StoriesBundle = require(bundlePath);
  unRequire(bundlePath);
  await unlink(bundlePath);
  return bundle;
}
