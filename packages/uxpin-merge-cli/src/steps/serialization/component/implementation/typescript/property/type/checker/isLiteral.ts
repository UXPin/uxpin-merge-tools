import * as ts from 'typescript';

export function isLiteral(type:ts.Type):type is ts.LiteralType {
  return type.isLiteral();
}
