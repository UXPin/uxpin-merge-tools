import { ensureDir } from 'fs-extra';
import { writeToFile } from '../../../utils/fs/writeToFile';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { BuildOptions } from '../BuildOptions';
import { getComponentLibraryInputPath } from './getComponentLibraryInputPath';
import { getLibraryBundleSource } from './getLibraryBundleSource';

export async function createComponentsLibrary(
  componentInfos:ComponentDefinition[],
  { uxpinDirPath, wrapperPath, cssResources }:BuildOptions,
):Promise<void> {
  await ensureDir(uxpinDirPath);
  await writeToFile(
      getComponentLibraryInputPath(uxpinDirPath),
      getLibraryBundleSource(componentInfos, wrapperPath, cssResources),
  );
}
