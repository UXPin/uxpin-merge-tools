import * as ts from 'typescript';
import { PropertyType } from '../../../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { convertTypeToPropertyType } from './convertTypeToPropertyType';

export function serializeUnionType(context:TSSerializationContext, type:ts.UnionType):PropertyType<'union'> {
  return {
    name: 'union',
    structure: {
      elements: type.types.map((node) => convertTypeToPropertyType(context, node)),
    },
  };
}
