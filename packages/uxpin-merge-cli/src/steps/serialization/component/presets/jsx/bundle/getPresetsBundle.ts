import { unlink } from 'fs-extra';
import {CreateAppProgramArgs, ProgramArgs} from '../../../../../../program/args/ProgramArgs';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { compilePresets } from '../compile/compilePresets';
import { PresetsBundle } from './PresetsBundle';

export async function getPresetsBundle(
  programArgs:Exclude<ProgramArgs, CreateAppProgramArgs>,
  components:ComponentDefinition[],
):Promise<PresetsBundle> {
  const bundlePath:string = await compilePresets(programArgs, components);
  const bundle:PresetsBundle = require(bundlePath);
  unRequire(bundlePath);
  await unlink(bundlePath);
  return bundle;
}

function unRequire(name:string):void {
  delete require.cache[require.resolve(name)];
}
