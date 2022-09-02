import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';

export function serializeLiteralType(typeNode: ts.LiteralType): PropertyType<'literal'> {
  return {
    name: 'literal',
    structure: {
      value: typeNode.value,
    },
  };
}
