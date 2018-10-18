import * as path from 'path';
import { ExperimentMetadataOptions, METADATA_FILE_NAME } from './saveMetadata';

export function getMetadataFilePath(buildOptions:ExperimentMetadataOptions):string {
  return path.resolve(buildOptions.uxpinDirPath, METADATA_FILE_NAME);
}
