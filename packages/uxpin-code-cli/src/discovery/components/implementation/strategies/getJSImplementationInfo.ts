import isFilePromise = require('is-file-promise');
import { join } from 'path';
import { ComponentImplementationInfo } from '../../ComponentInfo';

export function getJSImplementationInfo(dirPath:string, fileName:string):Promise<ComponentImplementationInfo> {
  const path:string = join(dirPath, `${fileName}.jsx`);
  const info:ComponentImplementationInfo = {
    framework: 'reactjs',
    lang: 'javascript',
    path,
  };
  return isFilePromise(path).then(() => info);
}
