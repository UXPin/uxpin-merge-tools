import * as ts from 'typescript';
import { isObjectLike } from './isObjectLike';

export function isCallable(type:ts.Type):boolean {
  return isObjectLike(type) && !!type.getCallSignatures().length;
}
