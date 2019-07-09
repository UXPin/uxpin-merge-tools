import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../context/getSerializationContext';
import { serializeAsUnsupportedType } from './serializeAsUnsupportedType';
import { KNOWN_TYPES_MAP, serializeKnownPropertyType } from './serializeKnownPropertyType';
import { serializeLiteralType } from './serializeLiteralType';
import { serializeUnionType } from './serializeUnionType';

// tslint:disable no-bitwise
export function convertTypeToPropertyType(context:TSSerializationContext, type:ts.Type):PropertyType {
  if (type.flags & ts.TypeFlags.String) {
    return { name: 'string', structure: {} };
  }
  if (type.flags & ts.TypeFlags.Number) {
    return { name: 'number', structure: {} };
  }
  if (isBooleanLike(type)) {
    return { name: 'boolean', structure: {} };
  }
  if (type.flags & ts.TypeFlags.Any) {
    return { name: 'any', structure: {} };
  }
  if (isKnownPropertyType(type)) {
    return serializeKnownPropertyType(type);
  }
  if (isCallable(type)) {
    return { name: 'func', structure: {} };
  }
  if (isObjectLike(type)) {
    return { name: 'shape', structure: {} };
  }
  if (type.flags & ts.TypeFlags.Union) {
    return serializeUnionType(context, type as ts.UnionType);
  }
  if (type.flags & ts.TypeFlags.Literal) {
    return serializeLiteralType(type as ts.LiteralType);
  }

  return serializeAsUnsupportedType(type);
}

function isBooleanLike(type:ts.Type):boolean {
  return Boolean(type.flags & ts.TypeFlags.BooleanLike);
}

function isObjectLike(type:ts.Type):boolean {
  return isObject(type) || isIntersectionOfObjects(type);
}

function isObject(type:ts.Type):boolean {
  return Boolean(type.flags & ts.TypeFlags.Object || type.flags & ts.TypeFlags.NonPrimitive);
}

function isIntersection(type:ts.Type):type is ts.IntersectionType {
  return Boolean(type.flags & ts.TypeFlags.Intersection);
}

function isIntersectionOfObjects(type:ts.Type):boolean {
  return isIntersection(type) && type.types.every(isObjectLike);
}

function isCallable(type:ts.Type):boolean {
  return isObjectLike(type) && !!type.getCallSignatures().length;
}

function isKnownPropertyType(type:ts.Type):boolean {
  const typeSymbol:ts.Symbol = type.symbol || type.aliasSymbol;
  return (
      (isObjectLike(type) || Boolean(type.flags & ts.TypeFlags.Union))
      && typeSymbol && typeSymbol.escapedName.toString() in KNOWN_TYPES_MAP);
}
