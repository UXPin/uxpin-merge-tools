import * as ts from 'typescript';

export function isObject(type: ts.Type): boolean {
  // tslint:disable-next-line no-bitwise
  return Boolean(type.flags & ts.TypeFlags.Object || type.flags & ts.TypeFlags.NonPrimitive);
}
