import fsReaddirPromise = require('fs-readdir-promise');
import isDirPromise = require('is-dir-promise');
import { join, relative } from 'path';
import { PATHS } from '../paths';
import { ProjectPaths } from '../ProjectPaths';
import { ComponentInfo } from './ComponentInfo';
import { getComponentInfo } from './getComponentInfo';

export function getDesignSystemComponentInfos():Promise<ComponentInfo[]> {
  let componentsDirectory:string;
  return getComponentsDirectory()
    .then((directory) => componentsDirectory = directory)
    .then(fsReaddirPromise)
    .then((content) => getComponentInfos(content, componentsDirectory));
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

function getComponentInfos(fileNames:string[], componentsDirPath:string):Promise<ComponentInfo[]> {
  const paths:ProjectPaths = {
    componentsDirPath: relative(process.cwd(), componentsDirPath),
    projectRoot: process.cwd(),
  };
  return Promise.all(fileNames.map((fileName) => getComponentInfo(paths, fileName)))
    .then((infoList) => infoList.filter(Boolean) as ComponentInfo[]);
}
