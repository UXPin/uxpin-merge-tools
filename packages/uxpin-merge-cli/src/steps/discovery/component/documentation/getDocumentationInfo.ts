// @ts-ignore
import pAny = require('p-any');
import { join, relative } from 'path';
import { isFile } from '../../../../utils/fs/isFile';
import { tapPromise } from '../../../../utils/promise/tapPromise';
import { ComponentDocumenationInfo } from '../ComponentInfo';
import { ComponentPaths } from '../paths/ComponentPaths';

export function getDocumentationInfo(paths:ComponentPaths):Promise<ComponentDocumenationInfo> {
  const { projectRoot, componentDirPath, componentDirName } = paths;
  const fileNames:string[] = ['Readme.md', 'README.md', `${componentDirName}.md`];
  const possiblePaths:string[] = fileNames.map((fileName) => join(projectRoot, componentDirPath, fileName));

  // @ts-ignore
  return pAny(possiblePaths.map(tapPromise(isExactFile))).then((foundPath) => ({
    path: relative(projectRoot, foundPath),
  }));
}

function isExactFile(path:string):Promise<void> {
  return isFile(path, { caseSensitive: true }).then((value) => {
    if (!value) {
      throw new Error(`${path} is not a file`);
    }
  });
}
