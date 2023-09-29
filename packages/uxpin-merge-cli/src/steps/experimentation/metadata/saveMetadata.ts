import { DSMetadata } from '../../../program/DSMeta';
import { writeToFile } from '../../../utils/fs/writeToFile';
import { DesignSystemSnapshot } from '../../serialization/DesignSystemSnapshot';
import { getMetadataFilePath } from './getMetadataFilePath';

export const METADATA_FILE_NAME = 'metadata.json';
const INDENT = 2;

export function thunkSaveMetadataLibrary(buildOptions: ExperimentMetadataOptions): (ds: DSMetadata) => Promise<any> {
  return async ({ result }: DSMetadata) => {
    await saveMetadata(getMetadataFilePath(buildOptions.uxpinDirPath), result);
  };
}

function saveMetadata(filePath: string, snapshot: DesignSystemSnapshot): Promise<void> {
  const serializedSnapshot: string = JSON.stringify(snapshot, null, INDENT);
  return writeToFile(filePath, serializedSnapshot);
}

export interface ExperimentMetadataOptions {
  uxpinDirPath: string;
}
