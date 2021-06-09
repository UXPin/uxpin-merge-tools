import * as ts from 'typescript';
import { PropertyType } from '../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';

export function serializeEnumType(typeNode:ts.LiteralType):PropertyType<'enum'> {
  const typeSymbol:ts.Symbol = typeNode.symbol || typeNode.aliasSymbol;
  return {
    name: 'enum',
    structure: {
      label: typeSymbol.name,
      value: typeNode.value,
    },
  };
}
