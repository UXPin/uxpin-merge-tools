import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSComponentSerializationEnv } from '../../../serializeTSComponent';
import { convertTypeNodeToPropertyType } from './convertTypeNodeToPropertyType';

export function serializeUnionType(env:TSComponentSerializationEnv, typeNode:ts.UnionTypeNode):PropertyType<'union'> {
  return {
    name: 'union',
    structure: {
      elements: typeNode.types.map((node) => convertTypeNodeToPropertyType(env, node)),
    },
  };
}
