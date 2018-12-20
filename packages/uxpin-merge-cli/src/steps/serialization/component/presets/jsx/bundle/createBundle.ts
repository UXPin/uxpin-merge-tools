import { ensureDir } from 'fs-extra';
import { resolve } from 'path';
import { ProgramArgs } from '../../../../../../program/args/ProgramArgs';
import { getTempDirPath } from '../../../../../../program/args/providers/paths/getTempDirPath';
import { writeToFile } from '../../../../../../utils/fs/writeToFile';
import { ComponentPresetInfo } from '../../../../../discovery/component/ComponentInfo';
import { getSourceFileContentToBundle } from './getSourceFileContentToBundle';

const BUNDLE_SOURCE_FILE:string = 'presets.jsx';

export async function createBundle(programArgs:ProgramArgs, infos:ComponentPresetInfo[]):Promise<string> {
  const tempDirPath:string = getTempDirPath(programArgs);
  await ensureDir(tempDirPath);
  const bundlePath:string = resolve(tempDirPath, BUNDLE_SOURCE_FILE);
  await writeToFile(bundlePath, getSourceFileContentToBundle(tempDirPath, infos));
  return bundlePath;
}
