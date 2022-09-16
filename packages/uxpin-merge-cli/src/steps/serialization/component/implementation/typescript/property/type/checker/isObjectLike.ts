import * as ts from 'typescript';
import { isIntersectionOfObjects } from './isIntersectionOfObjects';
import { isObject } from './isObject';

export function isObjectLike(type: ts.Type): boolean {
  return isObject(type) || isIntersectionOfObjects(type);
}
