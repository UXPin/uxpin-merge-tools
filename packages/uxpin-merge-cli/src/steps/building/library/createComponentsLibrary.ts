import { ensureDir } from 'fs-extra';
import { writeToFile } from '../../../utils/fs/writeToFile';
import { ComponentDefinition } from '../../serialization/component/ComponentDefinition';
import { LIBRARY_INPUT_PATH, TEMP_DIR_PATH } from '../config/getConfig';
import { getFileString } from './getFileString';

export async function createComponentsLibrary(
  componentInfos:ComponentDefinition[],
  wrapperPath?:string,
):Promise<string> {
  await ensureDir(TEMP_DIR_PATH);
  await writeToFile(LIBRARY_INPUT_PATH, getFileString(componentInfos, wrapperPath));
  return LIBRARY_INPUT_PATH;
}
