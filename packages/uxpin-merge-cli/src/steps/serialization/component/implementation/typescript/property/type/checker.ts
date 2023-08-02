import * as ts from 'typescript';

import { KNOWN_TYPES_MAP } from './node/serializeKnownPropertyType';

export function isAny(type: ts.Type): boolean {
  return Boolean(type.flags & ts.TypeFlags.Any);
}

export function isBooleanLike(type: ts.Type): boolean {
  return Boolean(type.flags & ts.TypeFlags.BooleanLike);
}

export function isCallable(type: ts.Type): boolean {
  return isObjectLike(type) && !!type.getCallSignatures().length;
}

export function isEnum(type: ts.Type): type is ts.LiteralType {
  if (type.symbol?.valueDeclaration) {
    return ts.isEnumMember(type.symbol.valueDeclaration);
  }

  return false;
}

export function isKnownPropertyType(type: ts.Type): boolean {
  const typeSymbol: ts.Symbol = type.symbol || type.aliasSymbol;

  return (
    (isAny(type) || isObjectLike(type) || isUnion(type)) &&
    typeSymbol &&
    typeSymbol.escapedName.toString() in KNOWN_TYPES_MAP
  );
}

export function isIntersection(type: ts.Type): type is ts.IntersectionType {
  return type.isIntersection();
}

export function isIntersectionOfObjects(type: ts.Type): boolean {
  return isIntersection(type) && type.types.every(isObjectLike);
}

export function isLiteral(type: ts.Type): type is ts.LiteralType {
  return type.isLiteral();
}

export function isObject(type: ts.Type): boolean {
  return Boolean(type.flags & ts.TypeFlags.Object || type.flags & ts.TypeFlags.NonPrimitive);
}

export function isObjectLike(type: ts.Type): boolean {
  return isObject(type) || isIntersectionOfObjects(type);
}

export function isUnion(type: ts.Type): type is ts.UnionType {
  return type.isUnion();
}
