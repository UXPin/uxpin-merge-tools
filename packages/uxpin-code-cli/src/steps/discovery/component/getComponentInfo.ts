import { join } from 'path';
import { ProjectPaths } from '../paths/ProjectPaths';
import { ComponentInfo } from './ComponentInfo';
import { ComponentPaths } from './ComponentPaths';
import { getDocumentationInfo } from './documentation/getDocumentationInfo';
import { getImplementationInfo } from './implementation/getImplementationInfo';

export function getComponentInfo(paths:ProjectPaths, componentName:string):Promise<ComponentInfo | null> {
  const componentDirPath:string = join(paths.componentsDirPath, componentName);
  const componentPaths:ComponentPaths = { ...paths, componentDirPath };
  return getBasics(componentPaths, componentName)
    .then(fillDocumentation(componentPaths, componentName))
    .catch(() => null);
}

function getBasics(componentPaths:ComponentPaths, componentName:string):Promise<ComponentInfo> {
  return getImplementationInfo(componentPaths, componentName).then((implementation) => ({
    dirPath: componentPaths.componentDirPath,
    implementation,
    name: componentName,
  }));
}

function fillDocumentation(paths:ComponentPaths, componentName:string):(info:ComponentInfo) => Promise<ComponentInfo> {
  return (info:ComponentInfo) => getDocumentationInfo(paths, componentName)
    .then((documentation) => ({ ...info, documentation }))
    .catch(() => info);
}
