import * as ts from 'typescript';
import { createUnionTypeNode } from 'typescript';

export function getValidSymbols(symbol: ts.Symbol): ts.Symbol[] {
  if (symbol.valueDeclaration) {
    return [symbol];
  }

  if (symbol.declarations?.length && symbol.declarations.length > 0) {
    const declarations: DeclarationWithSymbol[] = getDeclarationsWithSymbol(symbol.declarations);
    return declarations.map((declaration) => declaration.symbol);
  }

  return [];
}

interface DeclarationWithSymbol extends ts.Declaration {
  symbol: ts.Symbol;
}

function hasSymbol(declaration: ts.Declaration): declaration is DeclarationWithSymbol {
  return declaration.hasOwnProperty('symbol');
}

function getDeclarationsWithSymbol(declarations: ts.Declaration[]): DeclarationWithSymbol[] {
  return declarations.filter(hasSymbol);
}
