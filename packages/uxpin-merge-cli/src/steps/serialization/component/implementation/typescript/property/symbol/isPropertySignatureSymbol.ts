import * as ts from 'typescript';

export type PropertySymbol = ts.Symbol & { valueDeclaration:ts.PropertySignature };

export function isPropertySignatureSymbol(symbol:ts.Symbol):symbol is PropertySymbol {
  return ts.isPropertySignature(symbol.valueDeclaration);
}
