import pAny = require('p-any');
import { join, relative } from 'path';
import { isFile } from '../../../../utils/fs/isFile';
import { tapPromise } from '../../../../utils/promise/tapPromise';
import { ComponentDocumenationInfo } from '../ComponentInfo';
import { ComponentPaths } from '../ComponentPaths';

export function getDocumentationInfo(paths:ComponentPaths, name:string):Promise<ComponentDocumenationInfo> {
  const fileNames:string[] = ['Readme.md', 'README.md', `${name}.md`];
  const possiblePaths:string[] = fileNames.map((fileName) => join(paths.projectRoot, paths.componentDirPath, fileName));

  return pAny(possiblePaths.map(tapPromise(isExactFile))).then((foundPath) => ({
    path: relative(paths.projectRoot, foundPath),
  }));
}

function isExactFile(path:string):Promise<void> {
  return isFile(path, { caseSensitive: true });
}
