import * as ts from 'typescript';
import { PropertyType } from '../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { isBooleanLike } from '../../../../../../../steps/serialization/component/implementation/typescript/property/type/checker/isBooleanLike';
import { isCallable } from '../../../../../../../steps/serialization/component/implementation/typescript/property/type/checker/isCallable';
import { isEnum } from '../../../../../../../steps/serialization/component/implementation/typescript/property/type/checker/isEnum';
import { isKnownPropertyType } from '../../../../../../../steps/serialization/component/implementation/typescript/property/type/checker/isKnownPropertyType';
import { isLiteral } from '../../../../../../../steps/serialization/component/implementation/typescript/property/type/checker/isLiteral';
import { isObjectLike } from '../../../../../../../steps/serialization/component/implementation/typescript/property/type/checker/isObjectLike';
import { isUnion } from '../../../../../../../steps/serialization/component/implementation/typescript/property/type/checker/isUnion';
import { serializeAsUnsupportedType } from './serializeAsUnsupportedType';
import { serializeEnumType } from './serializeEnumType';
import { serializeKnownPropertyType } from './serializeKnownPropertyType';
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
  if (isUnion(type)) {
    return serializeUnionType(context, type);
  }
  if (isEnum(type)) {
    return serializeEnumType(type);
  }
  if (isLiteral(type)) {
    return serializeLiteralType(type);
  }

  return serializeAsUnsupportedType(type);
}
