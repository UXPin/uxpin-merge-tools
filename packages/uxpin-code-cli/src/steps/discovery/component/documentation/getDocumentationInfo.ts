import isFilePromise = require('is-file-promise');
import pAny = require('p-any');
import { join, relative } from 'path';
import { tapPromise } from '../../../../utils/promise/tapPromise';
import { ComponentDocumenationInfo } from '../ComponentInfo';
import { ComponentPaths } from '../ComponentPaths';

export function getDocumentationInfo(paths:ComponentPaths, name:string):Promise<ComponentDocumenationInfo> {
  const possibleFileNames:string[] = ['Readme.md', 'README.md', `${name}.md`];
  const possibleLocations:string[] = possibleFileNames.map((n) => join(paths.projectRoot, paths.componentDirPath, n));

  return pAny(possibleLocations.map(tapPromise(isFilePromise))).then((foundPath) => ({
    path: relative(paths.projectRoot, foundPath),
  }));
}
