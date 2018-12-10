import * as ts from 'typescript';

import { PropertyType } from '../../../../ComponentPropertyDefinition';

export function serializeTypeLiteral(typeNode:ts.TypeLiteralNode):PropertyType {
  if (containsIndexSignature(typeNode)) {
    return { name: 'shape', structure: {} };
  }
  return { name: 'unsupported', structure: { raw: typeNode.getText() } };
}

function containsIndexSignature(typeNode:ts.TypeLiteralNode):boolean {
  return !!typeNode.members.find((m) => ts.isIndexSignatureDeclaration(m));
}
