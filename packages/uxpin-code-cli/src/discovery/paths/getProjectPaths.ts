import locatePath = require('locate-path');
import { join, relative } from 'path';
import { PATHS } from './paths';
import { ProjectPaths } from './ProjectPaths';

export function getProjectPaths():Promise<ProjectPaths> {
  const cwd:string = process.cwd();
  return locatePath(PATHS.map((directories) => join(cwd, ...directories))).then((foundPath) => {
    if (foundPath) {
      return ({ componentsDirPath: relative(cwd, foundPath), projectRoot: cwd });
    }
    throw new Error('Unable to locate components source directory');
  });
}
