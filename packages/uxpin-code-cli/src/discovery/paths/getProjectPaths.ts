import isDirPromise = require('is-dir-promise');
import pAny = require('p-any');
import { join, relative } from 'path';
import { PATHS } from './paths';
import { ProjectPaths } from './ProjectPaths';

export function getProjectPaths():Promise<ProjectPaths> {
  const cwd:string = process.cwd();
  return pAny(PATHS
    .map((directories) => join(cwd, ...directories))
    .map((path) => isDirPromise(path).then(() => path)))
    .then((foundPath) => ({ componentsDirPath: relative(cwd, foundPath), projectRoot: cwd }))
    .catch(() => Promise.reject(new Error('Unable to locate components source directory')));
}
