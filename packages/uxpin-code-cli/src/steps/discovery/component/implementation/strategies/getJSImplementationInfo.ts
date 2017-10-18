import { join, relative } from 'path';
import { isFile } from '../../../../../utils/fs/isFile';
import { ComponentImplementationInfo } from '../../ComponentInfo';
import { ComponentPaths } from '../../ComponentPaths';

export function getJSImplementationInfo(paths:ComponentPaths):Promise<ComponentImplementationInfo> {
  const { projectRoot, componentDirPath, componentDirName } = paths;
  const absoluteComponentPath:string = join(projectRoot, componentDirPath, `${componentDirName}.jsx`);
  const info:ComponentImplementationInfo = {
    framework: 'reactjs',
    lang: 'javascript',
    path: relative(projectRoot, absoluteComponentPath),
  };
  return isFile(absoluteComponentPath).then(() => info);
}
