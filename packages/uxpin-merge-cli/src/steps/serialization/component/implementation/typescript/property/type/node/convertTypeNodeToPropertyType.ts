import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSComponentSerializationEnv } from '../../../serializeTSComponent';
import { serializeLiteralType } from './serializeLiteralType';
import { serializeTypeReference } from './serializeTypeReference';
import { serializeUnionType } from './serializeUnionType';

export function convertTypeNodeToPropertyType(env:TSComponentSerializationEnv, typeNode:ts.TypeNode):PropertyType {
  switch (typeNode.kind) {
    case ts.SyntaxKind.StringKeyword:
      return { name: 'string', structure: {} };
    case ts.SyntaxKind.NumberKeyword:
      return { name: 'number', structure: {} };
    case ts.SyntaxKind.BooleanKeyword:
      return { name: 'boolean', structure: {} };
    case ts.SyntaxKind.UnionType:
      return serializeUnionType(env, typeNode as ts.UnionTypeNode);
    case ts.SyntaxKind.LiteralType:
      return serializeLiteralType(typeNode as ts.LiteralTypeNode);
    case ts.SyntaxKind.TypeReference:
      return serializeTypeReference(env, typeNode as ts.TypeReferenceNode);
    default:
      return { name: 'unsupported', structure: { raw: typeNode.getText() } };
  }
}
