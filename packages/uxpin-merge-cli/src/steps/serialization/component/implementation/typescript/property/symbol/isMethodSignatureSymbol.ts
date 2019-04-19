import * as ts from 'typescript';

export type MethodSymbol = ts.Symbol & { valueDeclaration:ts.MethodSignature };

export function isMethodSignatureSymbol(symbol:ts.Symbol):symbol is MethodSymbol {
  return ts.isMethodSignature(symbol.valueDeclaration);
}
