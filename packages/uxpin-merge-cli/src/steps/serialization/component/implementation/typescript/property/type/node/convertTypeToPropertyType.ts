import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../context/getSerializationContext';
import { isBooleanLike } from '../checker/isBooleanLike';
import { isCallable } from '../checker/isCallable';
import { isEnum } from '../checker/isEnum';
import { isKnownPropertyType } from '../checker/isKnownPropertyType';
import { isLiteral } from '../checker/isLiteral';
import { isObjectLike } from '../checker/isObjectLike';
import { isUnion } from '../checker/isUnion';
import { serializeAsUnsupportedType } from './serializeAsUnsupportedType';
import { serializeEnumType } from './serializeEnumType';
import { serializeKnownPropertyType } from './serializeKnownPropertyType';
import { serializeLiteralType } from './serializeLiteralType';
import { serializeUnionType } from './serializeUnionType';

export function convertTypeToPropertyType(
  context: TSSerializationContext,
  type: ts.Type,
  jsDocsTag: ts.JSDocTagInfo[],
  rawTypeName?: string
): PropertyType {
  if (type.flags & ts.TypeFlags.String) {
    return { name: 'string', structure: {} };
  }
  if (type.flags & ts.TypeFlags.Number) {
    return { name: 'number', structure: {} };
  }
  if (isBooleanLike(type)) {
    return { name: 'boolean', structure: {} };
  }
  if (isKnownPropertyType(type)) {
    return serializeKnownPropertyType(type);
  }
  if (type.flags & ts.TypeFlags.Any) {
    if (rawTypeName?.includes('ReactNode')) {
      return { name: 'node', structure: {} };
    }

    if (rawTypeName?.includes('ReactElement') || rawTypeName?.includes('JSX.Element')) {
      return { name: 'node', structure: {} };
    }

    return { name: 'any', structure: {} };
  }
  if (isCallable(type)) {
    return { name: 'func', structure: {} };
  }
  if (isObjectLike(type)) {
    return { name: 'shape', structure: {} };
  }
  if (isUnion(type)) {
    return serializeUnionType(context, type, jsDocsTag);
  }
  if (isEnum(type)) {
    return serializeEnumType(type);
  }
  if (isLiteral(type)) {
    return serializeLiteralType(type);
  }

  return serializeAsUnsupportedType(type);
}
