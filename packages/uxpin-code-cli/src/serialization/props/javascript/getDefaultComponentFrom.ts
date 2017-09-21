import fsReadfilePromise = require('fs-readfile-promise');
import { parse } from 'react-docgen';
import { ComponentDoc } from 'react-docgen-typescript/lib';

export function getDefaultComponentFrom(filePath:string):Promise<ComponentDoc> {
  return getFileContents(filePath).then(parse);
}

function getFileContents(filePath:string):Promise<string> {
  return fsReadfilePromise(filePath, { encoding: 'utf8' });
}
