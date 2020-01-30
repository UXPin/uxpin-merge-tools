import { unlink } from 'fs-extra';
import { ProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { compilePresets } from '../compile/compilePresets';
import { PresetsBundle } from './PresetsBundle';
import { unRequire } from './unRequire';

export async function getPresetsBundle(
  programArgs:ProgramArgs,
  components:ComponentDefinition[],
):Promise<PresetsBundle> {
  const bundlePath:string = await compilePresets(programArgs, components);
  const bundle:PresetsBundle = require(bundlePath);
  unRequire(bundlePath);
  await unlink(bundlePath);
  return bundle;
}
