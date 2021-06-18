import { ensureDir } from 'fs-extra';
import { Framework } from '../../../framework/framework';
import { writeToFile } from '../../../utils/fs/writeToFile';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { BuildOptions } from '../BuildOptions';
import { getComponentLibraryInputPath } from './getComponentLibraryInputPath';

export async function createComponentsLibrary(
  componentInfos:ComponentDefinition[],
  { uxpinDirPath, wrapperPath }:BuildOptions,
):Promise<void> {
  await ensureDir(uxpinDirPath);
  await writeToFile(
    getComponentLibraryInputPath(uxpinDirPath),
    Framework.loadFrameworkModule('getLibraryBundleSource')(componentInfos, wrapperPath));
}
