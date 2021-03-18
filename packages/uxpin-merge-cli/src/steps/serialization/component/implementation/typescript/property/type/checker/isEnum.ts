import * as ts from 'typescript';

export function isEnum(type:ts.Type):type is ts.LiteralType {
  const typeSymbol:ts.Node = type.symbol.valueDeclaration;
  return typeSymbol.kind === ts.SyntaxKind.EnumMember;
}
