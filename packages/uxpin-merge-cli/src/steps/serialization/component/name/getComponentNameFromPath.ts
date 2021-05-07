import { parse } from 'path';
import { getComponentClassName } from './getComponentClassName';

export function getComponentNameFromPath(path:string):string {
  return getComponentClassName(parse(path).name.split('.')[0]);
}
