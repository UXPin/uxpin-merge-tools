import { sep } from 'path';
import pathSort = require('path-sort');

export function sortFilePaths(paths:string[]):string[] {
  return pathSort(paths, sep);
}
