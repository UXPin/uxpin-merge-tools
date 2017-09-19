import { every, some } from 'lodash';
import { join } from 'path';

import { isDirectory, isFile } from '../utils/asynchronousFS';

function containsJSXFile(path:string, fileName:string):Promise<boolean> {
  return Promise.all([
    isFile(join(path, `${fileName}.jsx`)),
    isFile(join(path, `${fileName}.tsx`)),
  ])
    .then(some);
}

export function isComponent(path:string, fileName:string):Promise<boolean> {
  return Promise.all([
    isDirectory(path),
    containsJSXFile(path, fileName),
  ])
    .then(every);
}
