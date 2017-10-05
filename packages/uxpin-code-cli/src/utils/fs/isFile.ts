import isFilePromise = require('is-file-promise');
import { isFileCaseSensitive } from './isFile/isFileCaseSensitive';

// tslint:disable-next-line:typedef
const defaults = {
  caseSensitive: false,
};

export function isFile(path:string, options:typeof defaults):Promise<void> {
  const { caseSensitive }:typeof defaults = { ...defaults, ...options };
  if (caseSensitive) {
    return isFileCaseSensitive(path);
  }
  return isFilePromise(path);
}
