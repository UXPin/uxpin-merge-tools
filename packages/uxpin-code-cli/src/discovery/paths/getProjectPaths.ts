import isDirPromise = require('is-dir-promise');
import { join, relative } from 'path';
import { PATHS } from './paths';
import { ProjectPaths } from './ProjectPaths';

export function getProjectPaths():Promise<ProjectPaths> {
  const cwd:string = process.cwd();
  const paths:string[] = PATHS.map((directories) => join(cwd, ...directories));

  return Promise.all(paths.map((dirPath) => isDirPromise(dirPath).then(() => true).catch(() => false)))
    .then((isDirectoryList) => {
      const found:string | undefined = paths.find((path, index) => isDirectoryList[index]);
      if (found) {
        return {
          componentsDirPath: relative(cwd, found),
          projectRoot: cwd,
        };
      }
      throw new Error('Unable to locate components source directory');
    });
}
