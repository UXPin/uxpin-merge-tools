import { readdir, stat } from 'fs';
import { every, some } from 'lodash';
import { join } from 'path';

const DIR_COMPONENTS:string = 'components';
const DIR_SRC:string = 'src';

const PATHS:string[][] = [
  [DIR_SRC, DIR_COMPONENTS],
  [DIR_SRC],
];

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

function isDirectory(path:string):Promise<boolean> {
  return new Promise((resolve) => {
    stat(path, (error, stats) => {
      if (error) {
        return resolve(false);
      }

      resolve(stats.isDirectory());
    });
  });
}

function isFile(path:string):Promise<boolean> {
  return new Promise((resolve) => {
    stat(path, (error, stats) => {
      if (error) {
        return resolve(false);
      }

      resolve(stats.isFile());
    });
  });
}

function containsJSXFile(path:string, fileName:string):Promise<boolean> {
  return Promise.all([
    isFile(join(path, `${fileName}.jsx`)),
    isFile(join(path, `${fileName}.tsx`)),
  ])
    .then(some);
}

function isComponent(path:string, fileName:string):Promise<boolean> {
  return Promise.all([
    isDirectory(path),
    containsJSXFile(path, fileName),
  ])
    .then(every);
}

function getDirectoryContent(path:string):Promise<string[]> {
  return new Promise((resolve, reject) => {
    readdir(path, (err, fileNames) => {
      if (err) {
        return reject(err);
      }

      resolve(fileNames);
    });
  });
}

function filterComponents(fileNames:string[], componentsDirectory:string):Promise<string[]> {
  return Promise.all(fileNames.map((fileName) => {
    const path:string = join(componentsDirectory, fileName);
    return isComponent(path, fileName);
  }))
    .then((isComponentList) => fileNames.filter((fileName, index) => isComponentList[index]));
}

export function getDesignSystemComponents():Promise<string[]> {
  let componentsDirectory:string;
  return getComponentsDirectory()
    .then((directory) => componentsDirectory = directory)
    .then(getDirectoryContent)
    .then((content) => filterComponents(content, componentsDirectory));
}
