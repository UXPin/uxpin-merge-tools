import { ensureDir } from 'fs-extra';
import { resolve } from 'path';
import { ProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { getTempDirPath } from '../../../../../../program/args/providers/paths/getTempDirPath';
import { writeToFile } from '../../../../../../utils/fs/writeToFile';
import { ComponentCategoryInfo } from '../../../../../discovery/component/category/ComponentCategoryInfo';
import { getSourceFileContentToBundle } from './getSourceFileContentToBundle';

const PRESETS_FILE_NAME:string = 'presets-all.js';

export async function createBundleSource(programArgs:ProgramArgs, infos:ComponentCategoryInfo[]):Promise<string> {
  const tempDirPath:string = getTempDirPath(programArgs);
  await ensureDir(tempDirPath);
  const bundleSourcePath:string = resolve(tempDirPath, PRESETS_FILE_NAME);
  await writeToFile(bundleSourcePath, getSourceFileContentToBundle(tempDirPath, infos));
  return bundleSourcePath;
}
