import { existsSync, readdir, statSync } from 'fs';
import { every, find, reduce, some } from 'lodash';
import { join } from 'path';

const DIR_COMPONENTS:string = 'components';
const DIR_SRC:string = 'src';

const PATHS:string[][] = [
  [DIR_SRC, DIR_COMPONENTS],
  [DIR_SRC],
];

function getComponentsDirectory():string {
  const cwd:string = process.cwd();
  const paths:string[] = PATHS.map((directories) => join(cwd, ...directories));
  const found:string|undefined = find(paths, (path) => existsSync(path));

  if (!found) {
    throw new Error('Unable to locate components source directory');
  }

  return found;
}

function getComponentPath(path:string, fileName:string):string {
  return fileName;
}

function isDirectory(path:string):boolean {
  return statSync(path).isDirectory();
}

function containsJSXFile(path:string, fileName:string):boolean {
  return some([
    existsSync(join(path, `${fileName}.jsx`)),
    existsSync(join(path, `${fileName}.tsx`)),
  ]);
}

function isComponent(path:string, fileName:string):boolean {
  return every([
    isDirectory(path),
    containsJSXFile(path, fileName),
  ]);
}

export function getDesignSystemComponents():Promise<string[]> {
  return new Promise((resolve, reject) => {
    const componentsDirectory:string = getComponentsDirectory();

    readdir(componentsDirectory, (err, fileNames) => {
      if (err) {
        return reject(err);
      }

      resolve(reduce(fileNames, (componentPaths:string[], fileName:string) => {
        const path:string = join(componentsDirectory, fileName);

        if (isComponent(path, fileName)) {
          return [...componentPaths, getComponentPath(path, fileName)];
        }

        return componentPaths;
      }, []));
    });
  });
}
