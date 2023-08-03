import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';

export const KNOWN_TYPES_MAP: { [typeName: string]: PropertyType } = {
  Array: { name: 'array', structure: {} },
  Date: { name: 'date', structure: {} },
  ReactElement: { name: 'element', structure: {} },
  ReactNode: { name: 'node', structure: {} },
  ReactChild: { name: 'node', structure: {} },
  ReactNodeArray: { name: 'node', structure: {} },
  // TODO Following types are very specific and should be handled in a different way
  // Maybe defaulting unknown types to `string` instead of `any` would be better?
  AnchorHTMLAttributes: { name: 'string', structure: {} },
  ButtonHTMLAttributes: { name: 'string', structure: {} },
};

export function serializeKnownPropertyType(type: ts.Type): PropertyType {
  const typeSymbol: ts.Symbol = type.symbol || type.aliasSymbol;
  return KNOWN_TYPES_MAP[typeSymbol.escapedName.toString()];
}
