import isFilePromise = require('is-file-promise');
import pAny = require('p-any');
import { join, relative } from 'path';
import { tapPromise } from '../../../../utils/promise/tapPromise';
import { ComponentDocumenationInfo } from '../ComponentInfo';
import { ComponentPaths } from '../ComponentPaths';

export function getDocumentationInfo(paths:ComponentPaths, name:string):Promise<ComponentDocumenationInfo> {
  const absDirPath:string = join(paths.projectRoot, paths.componentDirPath);
  const possibleLocations:string[] = [
    join(absDirPath, 'Readme.md'),
    join(absDirPath, 'README.md'),
    join(absDirPath, `${name}.md`),
  ];

  return pAny(possibleLocations.map(tapPromise(isFilePromise))).then((foundPath) => ({
    path: relative(paths.projectRoot, foundPath),
  }));
}
