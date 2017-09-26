import { join } from 'path';

import { getDirectoryContent, isDirectory } from '../utils/asynchronousFS';
import { isComponent } from './isComponent';

const DIR_COMPONENTS:string = 'components';
const DIR_SRC:string = 'src';

const PATHS:string[][] = [
  [DIR_SRC, DIR_COMPONENTS],
  [DIR_SRC],
];

export function getDesignSystemComponentLocations():Promise<string[]> {
  let componentsDirectory:string;
  return getComponentsDirectory()
    .then((directory) => componentsDirectory = directory)
    .then(getDirectoryContent)
    .then((content) => filterComponents(content, componentsDirectory));
}

function getComponentsDirectory():Promise<string> {
  const cwd:string = process.cwd();
  const paths:string[] = PATHS.map((directories) => join(cwd, ...directories));

  return Promise.all(paths.map(isDirectory))
    .then((isDirectoryList) => {
      const found:string|undefined = paths.find((path, index) => isDirectoryList[index]);

      if (!found) {
        throw new Error('Unable to locate components source directory');
      }

      return found;
    });
}

function filterComponents(fileNames:string[], componentsDirectory:string):Promise<string[]> {
  return Promise.all(fileNames.map((fileName) => {
    const path:string = join(componentsDirectory, fileName);
    return isComponent(path, fileName);
  }))
    .then((isComponentList) => fileNames.filter((fileName, index) => isComponentList[index]));
}
