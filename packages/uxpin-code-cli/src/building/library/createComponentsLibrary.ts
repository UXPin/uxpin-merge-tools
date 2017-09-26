import { writeFile } from 'fs';
import mkdirpPromise = require('mkdirp-promise');

import { ComponentInfo } from '../../components/ComponentInfo';
import { LIBRARY_INPUT_PATH, TEMP_DIR_PATH } from '../../config/webpack.config';
import { getFileString } from './getFileString';

export function createComponentsLibrary(componentInfos:ComponentInfo[], wrapperPath?:string):Promise<string> {
  return new Promise((resolve, reject) => {
    mkdirpPromise(TEMP_DIR_PATH)
      .then(() => writeFile(LIBRARY_INPUT_PATH, getFileString(componentInfos, wrapperPath), 'utf8', (error) => {
        if (error) {
          return reject(error.message);
        }

        resolve(LIBRARY_INPUT_PATH);
      }));
  });
}
