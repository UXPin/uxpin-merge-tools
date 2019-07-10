import * as ts from 'typescript';

export function isUnion(type:ts.Type):type is ts.UnionType {
  return type.isUnion();
}
