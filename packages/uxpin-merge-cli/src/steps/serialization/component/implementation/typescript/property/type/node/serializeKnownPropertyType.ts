import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';

export const KNOWN_TYPES_MAP:{ [typeName:string]:PropertyType } = {
  Array: { name: 'array', structure: {} },
  ReactElement: { name: 'element', structure: {} },
  ReactNode: { name: 'node', structure: {} },
  Date: { name: 'date', structure: {} },
};

export function serializeKnownPropertyType(type:ts.Type):PropertyType {
  const typeSymbol:ts.Symbol = type.symbol || type.aliasSymbol;
  return KNOWN_TYPES_MAP[typeSymbol.escapedName.toString()];
}
