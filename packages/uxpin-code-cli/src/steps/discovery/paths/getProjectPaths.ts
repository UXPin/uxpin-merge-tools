import { join, relative } from 'path';
import { locatePath } from '../../../utils/fs/locatePath';
import { PATHS } from './paths';
import { ProjectPaths } from './ProjectPaths';

export function getProjectPaths(projectRoot:string):Promise<ProjectPaths> {
  return locatePath(PATHS.map((directories) => join(projectRoot, ...directories))).then((foundPath) => {
    if (foundPath) {
      return ({ componentsDirPath: relative(projectRoot, foundPath), projectRoot });
    }
    throw new Error('Unable to locate components source directory');
  });
}
