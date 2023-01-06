import { head } from 'lodash';
import * as ts from 'typescript';

export function getValidSymbol(symbol: ts.Symbol): ts.Symbol | undefined {
  if (symbol.valueDeclaration) {
    return symbol;
  }

  if (symbol.declarations?.length && symbol.declarations.length > 0) {
    const declaration: DeclarationWithSymbol | undefined = getFirstDeclarationWithSymbol(symbol.declarations);

    return declaration ? declaration.symbol : undefined;
  }
}

interface DeclarationWithSymbol extends ts.Declaration {
  symbol: ts.Symbol;
}

function hasSymbol(declaration: ts.Declaration): declaration is DeclarationWithSymbol {
  return declaration.hasOwnProperty('symbol');
}

function getFirstDeclarationWithSymbol(declarations: ts.Declaration[]): DeclarationWithSymbol | undefined {
  return head(declarations.filter(hasSymbol));
}
