import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';

export function serializeEnumType(typeNode:ts.LiteralType):PropertyType<'enum'> {
  const typeSymbol:ts.Symbol = typeNode.symbol || typeNode.aliasSymbol;
  return {
    name: 'enum',
    structure: {
      name: typeSymbol.name,
      value: typeNode.value,
    },
  };
}
