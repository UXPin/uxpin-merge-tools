import fsReadfilePromise = require('fs-readfile-promise');
import { isEmpty } from 'lodash';
import { parse } from 'react-docgen';
import { ComponentDoc } from 'react-docgen-typescript/lib';

export function getDefaultComponentFrom(filePath:string):Promise<ComponentDoc> {
  return getFileContents(filePath).then((fileContents:string) => {
    const component:ComponentDoc | undefined = parse(fileContents);
    if (isEmpty(component)) {
      throw new Error(`Cannot find default exported component in ${filePath}`);
    }
    return component;
  });
}

function getFileContents(filePath:string):Promise<string> {
  return fsReadfilePromise(filePath, { encoding: 'utf8' });
}
