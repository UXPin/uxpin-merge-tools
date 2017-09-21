import { writeFile } from 'fs';

import { ComponentInfo } from '../../components/ComponentInfo';
import { getFileString } from './getFileString';

export function createComponentsLibrary(componentInfos:ComponentInfo[], wrapperPath?:string):Promise<void> {
  return new Promise((resolve, reject) => {
    writeFile('src/components.js', getFileString(componentInfos, wrapperPath), 'utf8', (error) => {
      if (error) {
        return reject(error.message);
      }

      resolve();
    });
  });
}
