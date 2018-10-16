import { writeFile } from 'fs';
import * as path from 'path';
import sortobject = require('sortobject');
import { DSMetadata } from '../../../program/DSMeta';
import { BuildOptions } from '../../building/BuildOptions';
import { TEMP_DIR_PATH } from '../../building/config/getConfig';
import { DesignSystemSnapshot } from '../../serialization/DesignSystemSnapshot';

export const METADATA_FILE_NAME:string = 'metadata.json';
const INDENT:number = 2;

export function thunkSaveMetadataLibrary(buildOptions:BuildOptions):(ds:DSMetadata) => Promise<any> {
  return async ({ result }:DSMetadata) => {
    const filePath:string = path.resolve(buildOptions.projectRoot, TEMP_DIR_PATH, METADATA_FILE_NAME);
    await saveMetadata(filePath, result);
  };
}

function saveMetadata(filePath:string, snapshot:DesignSystemSnapshot):Promise<void> {
  return new Promise((resolve, reject) => {
    const serializedSnapshot:string = JSON.stringify(sortobject(snapshot), null, INDENT);
    writeFile(filePath, serializedSnapshot, 'utf-8', (error) => {
      if (error) {
        return reject(error);
      }

      resolve();
    });
  });
}
