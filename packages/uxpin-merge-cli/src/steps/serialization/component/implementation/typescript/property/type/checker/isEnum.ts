import * as ts from 'typescript';

export function isEnum(type:ts.Type):type is ts.LiteralType {
  if (type.symbol && type.symbol.valueDeclaration) {
    const typeSymbol:ts.Node = type.symbol.valueDeclaration;
    return typeSymbol.kind === ts.SyntaxKind.EnumMember;
  }

  return false;
}
