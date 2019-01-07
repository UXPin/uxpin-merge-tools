import { unlink } from 'fs-extra';
import { ProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { ComponentCategoryInfo } from '../../../../../discovery/component/category/ComponentCategoryInfo';
import { compile } from '../compile/compile';
import { PresetsBundle } from './PresetsBundle';

export async function getBundle(programArgs:ProgramArgs, infos:ComponentCategoryInfo[]):Promise<PresetsBundle> {
  const bundlePath:string = await compile(programArgs, infos);
  const bundle:PresetsBundle = require(bundlePath);
  unRequire(bundlePath);
  await unlink(bundlePath);
  return bundle;
}

function unRequire(name:string):void {
  delete require.cache[require.resolve(name)];
}
