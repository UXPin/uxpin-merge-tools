import { join, relative } from 'path';
import { isFile } from '../../../../../utils/fs/isFile';
import { ComponentImplementationInfo } from '../../ComponentInfo';
import { ComponentPaths } from '../../ComponentPaths';

export function getTSImplementationInfo(paths:ComponentPaths):Promise<ComponentImplementationInfo> {
  const { projectRoot, componentDirPath, componentDirName } = paths;
  const absoluteComponentPath:string = join(projectRoot, componentDirPath, `${componentDirName}.tsx`);
  const info:ComponentImplementationInfo = {
    framework: 'reactjs',
    lang: 'typescript',
    path: relative(projectRoot, absoluteComponentPath),
  };
  return isFile(absoluteComponentPath).then(() => info);
}
