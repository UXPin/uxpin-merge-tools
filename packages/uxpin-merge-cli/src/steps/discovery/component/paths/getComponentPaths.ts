import { basename, dirname } from 'path';
import { ComponentPaths } from './ComponentPaths';

export function getComponentPaths(projectRoot:string, implementationPath:string):ComponentPaths {
  const componentDirPath:string = dirname(implementationPath);
  return {
    componentDirName: basename(componentDirPath),
    componentDirPath,
    projectRoot,
  };
}
