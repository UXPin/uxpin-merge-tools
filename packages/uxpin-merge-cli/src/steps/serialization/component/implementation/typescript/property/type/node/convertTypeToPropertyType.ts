import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../context/getSerializationContext';
import {
  isAny,
  isBooleanLike,
  isCallable,
  isEnum,
  isKnownPropertyType,
  isLiteral,
  isObjectLike,
  isUnion,
} from '../checker';
import { serializeAsUnsupportedType } from './serializeAsUnsupportedType';
import { serializeEnumType } from './serializeEnumType';
import { serializeKnownPropertyType } from './serializeKnownPropertyType';
import { serializeLiteralType } from './serializeLiteralType';
import { serializeUnionType } from './serializeUnionType';

export function convertTypeToPropertyType(
  context: TSSerializationContext,
  type: ts.Type,
  jsDocsTag: ts.JSDocTagInfo[]
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
  if (isAny(type)) {
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
