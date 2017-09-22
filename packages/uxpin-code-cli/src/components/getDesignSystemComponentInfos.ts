import fsReaddirPromise = require('fs-readdir-promise');
import isDirPromise = require('is-dir-promise');
import { join, relative } from 'path';
import { ComponentInfo } from './ComponentInfo';
import { getImplementationInfo } from './discovery/getImplementationInfo';

const DIR_COMPONENTS:string = 'components';
const DIR_SRC:string = 'src';

const PATHS:string[][] = [
  [DIR_SRC, DIR_COMPONENTS],
  [DIR_SRC],
];

export function getDesignSystemComponentInfos():Promise<ComponentInfo[]> {
  let componentsDirectory:string;
  return getComponentsDirectory()
    .then((directory) => componentsDirectory = directory)
    .then(fsReaddirPromise)
    .then((content) => getComponentsInfo(content, componentsDirectory));
}

function getComponentInfo(componentDirectory:string, componentName:string):Promise<ComponentInfo | null> {
  return getImplementationInfo(componentDirectory, componentName).then((implementation) => {
    return {
      dirPath: getRelativePath(join(componentDirectory, componentName)),
      implementation,
      name: componentName,
    };
  }).catch(() => null);
}

function getRelativePath(path:string):string {
  return relative(join(process.cwd(), DIR_SRC), path);
}

function getComponentsDirectory():Promise<string> {
  const cwd:string = process.cwd();
  const paths:string[] = PATHS.map((directories) => join(cwd, ...directories));

  return Promise.all(paths.map((dirPath) => isDirPromise(dirPath).then(() => true).catch(() => false)))
    .then((isDirectoryList) => {
      const found:string | undefined = paths.find((path, index) => isDirectoryList[index]);
      if (found) {
        return found;
      }
      throw new Error('Unable to locate components source directory');
    });
}

function getComponentsInfo(fileNames:string[], componentsDirectory:string):Promise<ComponentInfo[]> {
  return Promise.all(fileNames.map((fileName) => {
    const path:string = join(componentsDirectory, fileName);
    return getComponentInfo(path, fileName);
  }))
    .then((infoList) => infoList.filter(Boolean) as ComponentInfo[]);
}
