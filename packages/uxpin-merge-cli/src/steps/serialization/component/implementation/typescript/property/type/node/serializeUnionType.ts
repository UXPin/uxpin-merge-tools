import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../serializeTSComponent';
import { convertTypeToPropertyType } from './convertTypeNodeToPropertyType';

export function serializeUnionType(context:TSSerializationContext, type:ts.UnionType):PropertyType<'union'> {
  return {
    name: 'union',
    structure: {
      elements: type.types.map((node) => convertTypeToPropertyType(context, node)),
    },
  };
}
