import { join, relative } from 'path';
import { isFile } from '../../../../../utils/fs/isFile';
import { ComponentImplementationInfo } from '../../ComponentInfo';
import { ComponentPaths } from '../../ComponentPaths';

export function getJSImplementationInfo(paths:ComponentPaths, name:string):Promise<ComponentImplementationInfo> {
  const absoluteComponentPath:string = join(paths.projectRoot, paths.componentDirPath, `${name}.jsx`);
  const info:ComponentImplementationInfo = {
    framework: 'reactjs',
    lang: 'javascript',
    path: relative(paths.projectRoot, absoluteComponentPath),
  };
  return isFile(absoluteComponentPath).then(() => info);
}
