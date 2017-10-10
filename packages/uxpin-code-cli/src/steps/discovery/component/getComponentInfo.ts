import { join } from 'path';
import { ProjectPaths } from '../paths/ProjectPaths';
import { ComponentInfo } from './ComponentInfo';
import { ComponentPaths } from './ComponentPaths';
import { getDocumentationInfo } from './documentation/getDocumentationInfo';
import { getImplementationInfo } from './implementation/getImplementationInfo';

export function getComponentInfo(paths:ProjectPaths, componentDirName:string):Promise<ComponentInfo | null> {
  const componentDirPath:string = join(paths.componentsDirPath, componentDirName);
  const componentPaths:ComponentPaths = { ...paths, componentDirPath, componentDirName };
  return getBasics(componentPaths)
    .then(fillDocumentation(componentPaths))
    .catch(() => null);
}

function getBasics(componentPaths:ComponentPaths):Promise<ComponentInfo> {
  return getImplementationInfo(componentPaths).then((implementation) => ({
    dirPath: componentPaths.componentDirPath,
    implementation,
  }));
}

function fillDocumentation(paths:ComponentPaths):(info:ComponentInfo) => Promise<ComponentInfo> {
  return (info:ComponentInfo) => getDocumentationInfo(paths)
    .then((documentation) => ({ ...info, documentation }))
    .catch(() => info);
}
