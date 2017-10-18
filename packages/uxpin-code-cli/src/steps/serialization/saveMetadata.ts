import { writeFile } from 'fs';
import { Warned } from '../../common/warning/Warned';
import { LIBRARY_METADATA_PATH } from '../building/config/getConfig';
import { DesignSystemDefinition } from './DesignSystemDefinition';

export function saveMetadata({ result: { components } }:Warned<DesignSystemDefinition>):Promise<string> {
  return new Promise((resolve, reject) => {
    writeFile(LIBRARY_METADATA_PATH, JSON.stringify(components), 'utf8', (error) => {
      if (error) {
        return reject(error.message);
      }

      resolve(LIBRARY_METADATA_PATH);
    });
  });
}
