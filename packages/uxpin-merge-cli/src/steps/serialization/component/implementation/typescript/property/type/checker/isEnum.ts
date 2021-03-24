import * as ts from 'typescript';

export function isEnum(type:ts.Type):type is ts.LiteralType {
  if (type.symbol?.valueDeclaration) {
    return ts.isEnumMember(type.symbol.valueDeclaration);
  }

  return false;
}
