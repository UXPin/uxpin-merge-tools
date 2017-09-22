import isFilePromise = require('is-file-promise');
import { join } from 'path';
import { ComponentImplementationInfo } from '../../../ComponentInfo';

export function getTSImplementationInfo(dirPath:string, fileName:string):Promise<ComponentImplementationInfo> {
  const path:string = join(dirPath, `${fileName}.tsx`);
  const info:ComponentImplementationInfo = {
    framework: 'reactjs',
    lang: 'typescript',
    path,
  };
  return isFilePromise(path).then(() => info);
}
