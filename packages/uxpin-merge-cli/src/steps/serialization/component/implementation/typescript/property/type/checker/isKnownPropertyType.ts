import * as ts from 'typescript';
import { Framework } from '../../../../../../../../framework/framework';
import { isObjectLike } from './isObjectLike';
import { isUnion } from './isUnion';

export function isKnownPropertyType(type:ts.Type):boolean {
  const typeSymbol:ts.Symbol = type.symbol || type.aliasSymbol;

  return (
    (isObjectLike(type) || isUnion(type))
      && typeSymbol
      && typeSymbol.escapedName.toString() in Framework.loadFrameworkModule(
        'KNOWN_PROPERTY_TYPES_MAP',
    )
  );
}
