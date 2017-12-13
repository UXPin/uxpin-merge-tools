import pAny = require('p-any');
import { join, relative } from 'path';
import { isFile } from '../../../../../utils/fs/isFile';
import { ComponentImplementationInfo } from '../../ComponentInfo';
import { ComponentPaths } from '../../ComponentPaths';

export function getJSImplementationInfo(paths:ComponentPaths):Promise<ComponentImplementationInfo> {
  const jsPath:string = absoluteComponentPath(paths, 'js');
  const jsxPath:string = absoluteComponentPath(paths, 'jsx');
  return pAny([isComponentFile(jsxPath), isComponentFile(jsPath)])
    .then((foundPath) => getComponentInfo(paths, foundPath));
}

function absoluteComponentPath({ projectRoot, componentDirPath, componentDirName }:ComponentPaths, ext:string):string {
  return join(projectRoot, componentDirPath, `${componentDirName}.${ext}`);
}

function isComponentFile(path:string):Promise<string> {
  return isFile(path).then(() => path);
}

function getComponentInfo({ projectRoot }:ComponentPaths, componentPath:string):ComponentImplementationInfo {
  return {
    framework: 'reactjs',
    lang: 'javascript',
    path: relative(projectRoot, componentPath),
  };
}
