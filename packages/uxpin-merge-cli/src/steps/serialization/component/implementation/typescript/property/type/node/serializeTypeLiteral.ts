import * as ts from 'typescript';

import { PropertyType } from '../../../../ComponentPropertyDefinition';

export function serializeTypeLiteral(typeNode:ts.TypeLiteralNode):PropertyType {
  if (isObjectLike(typeNode)) {
    return { name: 'shape', structure: {} };
  }
  return { name: 'unsupported', structure: { raw: typeNode.getText() } };
}

function isObjectLike(typeNode:ts.TypeLiteralNode):boolean {
  return !!typeNode.members.find((m) => ts.isIndexSignatureDeclaration(m) || ts.isPropertySignature(m));
}
