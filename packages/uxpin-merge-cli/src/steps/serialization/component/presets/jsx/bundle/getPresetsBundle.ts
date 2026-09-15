import { getProjectVolume, readFile, remove } from '../../../../../../common/fs/projectFs';
import { evaluateBundle } from '../../../../../../common/fs/webpackProjectFs';
import { ProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { compilePresets } from '../compile/compilePresets';
import { PresetsBundle } from './PresetsBundle';

export async function getPresetsBundle(
  programArgs: ProgramArgs,
  components: ComponentDefinition[]
): Promise<PresetsBundle> {
  const bundlePath: string = await compilePresets(programArgs, components);
  const bundle: PresetsBundle = getProjectVolume()
    ? evaluateBundle(await readFile(bundlePath), bundlePath)
    : require(bundlePath);
  if (!getProjectVolume()) {
    unRequire(bundlePath);
  }
  await remove(bundlePath);
  return bundle;
}

function unRequire(name: string): void {
  delete require.cache[require.resolve(name)];
}
