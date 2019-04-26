import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../context/getSerializationContext';
import { serializeAsUnsupportedType } from './serializeAsUnsupportedType';
import { serializeLiteralType } from './serializeLiteralType';
import { TYPES_MAP } from './serializeTypeReference';
import { serializeUnionType } from './serializeUnionType';

// tslint:disable no-bitwise
export function convertTypeToPropertyType(context:TSSerializationContext, type:ts.Type):PropertyType {
  if (type.flags & ts.TypeFlags.String) {
    return  { name: 'string', structure: {} };
  }

  if (type.flags & ts.TypeFlags.Number) {
    return  { name: 'number', structure: {} };
  }

  if (type.flags & ts.TypeFlags.Boolean) {
    return  { name: 'boolean', structure: {} };
  }

  if (type.flags & ts.TypeFlags.Any) {
    return  { name: 'any', structure: {} };
  }

  if (type.flags & ts.TypeFlags.Object || type.flags & ts.TypeFlags.NonPrimitive) {
    if (!!type.getCallSignatures().length) {
      return { name: 'func', structure: {} };
    }

    const typeSymbol:ts.Symbol = type.symbol || type.aliasSymbol;
    if (typeSymbol && typeSymbol.escapedName.toString() in TYPES_MAP) {
      return TYPES_MAP[typeSymbol.escapedName.toString()];
    }

    return  { name: 'shape', structure: {} };
  }

  if (type.flags & ts.TypeFlags.Union) {
    const typeSymbol:ts.Symbol = type.symbol || type.aliasSymbol;
    if (typeSymbol && typeSymbol.escapedName.toString() in TYPES_MAP) {
      return TYPES_MAP[typeSymbol.escapedName.toString()];
    }
    return serializeUnionType(context, type as ts.UnionType);
  }

  if (type.flags & ts.TypeFlags.Literal) {
    return  serializeLiteralType(type as ts.LiteralType);
  }

  return serializeAsUnsupportedType(type);
}
