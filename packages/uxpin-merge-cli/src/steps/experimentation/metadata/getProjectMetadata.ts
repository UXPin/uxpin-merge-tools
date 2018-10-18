import { readFileFromPath } from '../../../utils/fs/readFileFromPath';
import { DesignSystemSnapshot } from '../../serialization/DesignSystemSnapshot';
import { getMetadataFilePath } from './getMetadataFilePath';

export async function getProjectMetadata(uxpinDirPath:string):Promise<DesignSystemSnapshot> {
  const file:Buffer = await readFileFromPath(getMetadataFilePath(uxpinDirPath));
  return JSON.parse(file.toString('utf-8'));
}
