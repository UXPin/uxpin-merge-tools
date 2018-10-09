import isFilePromise = require('is-file-promise');
import { isFileCaseSensitive } from './isFile/isFileCaseSensitive';

const defaults:IsFileOptions = {
  caseSensitive: false,
};

interface IsFileOptions {
  caseSensitive?:boolean;
}

export function isFile(path:string, options:IsFileOptions = {}):Promise<void> {
  const { caseSensitive }:IsFileOptions = { ...defaults, ...options };
  if (caseSensitive) {
    return isFileCaseSensitive(path);
  }
  return isFilePromise(path);
}
