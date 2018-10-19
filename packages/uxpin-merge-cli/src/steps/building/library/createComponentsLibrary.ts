import { ensureDir } from 'fs-extra';
import { writeToFile } from '../../../utils/fs/writeToFile';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { BuildOptions } from '../BuildOptions';
import { getComponentLibraryInputPath } from './getComponentLibraryInputPath';
import { getFileString } from './getFileString';

export async function createComponentsLibrary(
  componentInfos:ComponentDefinition[],
  { uxpinDirPath, wrapperPath }:BuildOptions,
):Promise<void> {
  await ensureDir(uxpinDirPath);
  await writeToFile(getComponentLibraryInputPath(uxpinDirPath), getFileString(componentInfos, wrapperPath));
}
