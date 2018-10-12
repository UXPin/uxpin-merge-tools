import { sep } from 'path';
import * as pathSort from 'path-sort';

export function sortFilePaths(paths:string[]):string[] {
  return pathSort(paths, sep);
}
