import pAny = require('p-any');
import { join, relative } from 'path';
import { isFile } from '../../../../utils/fs/isFile';
import { tapPromise } from '../../../../utils/promise/tapPromise';
import { ComponentDocumenationInfo } from '../ComponentInfo';
import { ComponentPaths } from '../ComponentPaths';

export function getDocumentationInfo(paths:ComponentPaths, name:string):Promise<ComponentDocumenationInfo> {
  const possibleFileNames:string[] = ['Readme.md', 'README.md', `${name}.md`];
  const possibleLocations:string[] = possibleFileNames.map((n) => join(paths.projectRoot, paths.componentDirPath, n));

  return pAny(possibleLocations.map(tapPromise(isExactFile))).then((foundPath) => ({
    path: relative(paths.projectRoot, foundPath),
  }));
}

function isExactFile(path:string):Promise<void> {
  return isFile(path, { caseSensitive: true });
}
