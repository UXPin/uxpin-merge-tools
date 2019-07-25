import * as ts from 'typescript';
import { KNOWN_TYPES_MAP } from '../node/serializeKnownPropertyType';
import { isObjectLike } from './isObjectLike';
import { isUnion } from './isUnion';

export function isKnownPropertyType(type:ts.Type):boolean {
  const typeSymbol:ts.Symbol = type.symbol || type.aliasSymbol;

  return (
    (isObjectLike(type) || isUnion(type))
      && typeSymbol
      && typeSymbol.escapedName.toString() in KNOWN_TYPES_MAP
  );
}
