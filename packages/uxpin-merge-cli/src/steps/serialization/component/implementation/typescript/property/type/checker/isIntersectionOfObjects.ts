import * as ts from 'typescript';
import { isIntersection } from './isIntersection';
import { isObjectLike } from './isObjectLike';

export function isIntersectionOfObjects(type: ts.Type): boolean {
  return isIntersection(type) && type.types.every(isObjectLike);
}
