import * as ts from 'typescript';

export function isBooleanLike(type:ts.Type):boolean {
  // tslint:disable-next-line no-bitwise
  return Boolean(type.flags & ts.TypeFlags.BooleanLike);
}
