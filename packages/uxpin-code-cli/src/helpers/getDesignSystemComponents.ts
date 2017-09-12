import * as FS from 'fs';
import { every, find, reduce, some } from 'lodash';
import * as Path from 'path';

const DIR_COMPONENTS:string = 'components';
const DIR_SRC:string = 'src';

const PATHS:string[][] = [
  [DIR_SRC, DIR_COMPONENTS],
  [DIR_SRC],
];

function getComponentsDirectory():string {
  const cwd:string = process.cwd();
  const paths:string[] = PATHS.map((directories) => Path.join(cwd, ...directories));
  const found:string|undefined = find(paths, (path) => FS.existsSync(path));

  if (!found) {
    throw new Error('Unable to locate components source directory');
  }

  return found;
}

function getComponentPath(path:string, fileName:string):string {
  return fileName;
}

function isDirectory(path:string):boolean {
  return FS.statSync(path).isDirectory();
}

function containsJSXFile(path:string, fileName:string):boolean {
  return some([
    FS.existsSync(Path.join(path, `${fileName}.jsx`)),
    FS.existsSync(Path.join(path, `${fileName}.tsx`)),
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

    FS.readdir(componentsDirectory, (err, fileNames) => {
      if (err) {
        return reject(err);
      }

      resolve(reduce(fileNames, (componentPaths:string[], fileName:string) => {
        const path:string = Path.join(componentsDirectory, fileName);

        if (isComponent(path, fileName)) {
          return [...componentPaths, getComponentPath(path, fileName)];
        }

        return componentPaths;
      }, []));
    });
  });
}
