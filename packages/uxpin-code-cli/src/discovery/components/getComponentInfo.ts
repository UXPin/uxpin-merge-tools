import { join } from 'path';
import { ProjectPaths } from '../paths/ProjectPaths';
import { ComponentInfo } from './ComponentInfo';
import { ComponentPaths } from './ComponentPaths';
import { getImplementationInfo } from './implementation/getImplementationInfo';

export function getComponentInfo(paths:ProjectPaths, componentName:string):Promise<ComponentInfo | null> {
  const componentDirPath:string = join(paths.componentsDirPath, componentName);
  const componentPaths:ComponentPaths = { ...paths, componentDirPath };
  return getImplementationInfo(componentPaths, componentName)
    .then((implementation) => {
      return {
        dirPath: componentDirPath,
        implementation,
        name: componentName,
      };
    }).catch(() => null);
}
