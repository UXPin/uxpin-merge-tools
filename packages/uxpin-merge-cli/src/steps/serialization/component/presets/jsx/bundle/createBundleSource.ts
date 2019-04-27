import { ensureDir } from 'fs-extra';
import { resolve } from 'path';
import { v4 } from 'uuid';
import { ProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { getTempDirPath } from '../../../../../../program/args/providers/paths/getTempDirPath';
import { writeToFile } from '../../../../../../utils/fs/writeToFile';
import { ComponentDefinition } from '../../../ComponentDefinition';
import { getSourceFileContentToBundle } from './getSourceFileContentToBundle';

export async function createBundleSource(programArgs:ProgramArgs, components:ComponentDefinition[]):Promise<string> {
  const tempDirPath:string = getTempDirPath(programArgs);
  await ensureDir(tempDirPath);
  const bundleSourcePath:string = resolve(tempDirPath, getUniqueFileName());
  await writeToFile(bundleSourcePath, getSourceFileContentToBundle(tempDirPath, components));
  return bundleSourcePath;
}

function getUniqueFileName():string {
  return `presets-${v4()}.js`;
}
