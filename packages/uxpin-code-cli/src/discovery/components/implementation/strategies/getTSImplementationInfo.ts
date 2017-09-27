import isFilePromise = require('is-file-promise');
import { join, relative } from 'path';
import { ComponentImplementationInfo } from '../../ComponentInfo';
import { ComponentPaths } from '../../ComponentPaths';

export function getTSImplementationInfo(paths:ComponentPaths, name:string):Promise<ComponentImplementationInfo> {
  const absoluteComponentPath:string = join(paths.projectRoot, paths.componentDirPath, `${name}.tsx`);
  const info:ComponentImplementationInfo = {
    framework: 'reactjs',
    lang: 'typescript',
    path: relative(paths.projectRoot, absoluteComponentPath),
  };
  return isFilePromise(absoluteComponentPath)
    .then(() => info);
}
