import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';

export function serializeLiteralType(typeNode:ts.LiteralType):PropertyType<'literal'> {
  return {
    name: 'literal',
    structure: {
      value: typeNode.value,
    },
  };
}

function getLiteralTypeNodeValue(typeNode:ts.LiteralType):any {
  switch (typeNode.literal.kind) {
    case ts.SyntaxKind.TrueKeyword:
      return true;
    case ts.SyntaxKind.FalseKeyword:
      return false;
    case ts.SyntaxKind.StringLiteral:
      return typeNode.literal.text;
  }
}
