import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../serializeTSComponent';
import { convertTypeNodeToPropertyType } from './convertTypeNodeToPropertyType';

export function serializeUnionType(context:TSSerializationContext, typeNode:ts.UnionTypeNode):PropertyType<'union'> {
  return {
    name: 'union',
    structure: {
      elements: typeNode.types.map((node) => convertTypeNodeToPropertyType(context, node)),
    },
  };
}
