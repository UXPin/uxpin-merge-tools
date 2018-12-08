import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSComponentSerializationEnv } from '../../../serializeTSComponent';
import { serializeTypeDeclaration } from '../declaration/serializeTypeDeclaration';

export function serializeTypeReference(env:TSComponentSerializationEnv, typeNode:ts.TypeReferenceNode):PropertyType {
  const typeSymbol:ts.Symbol = env.checker.getTypeFromTypeNode(typeNode).symbol;
  switch (typeSymbol.flags) {
    case ts.SymbolFlags.Interface:
      return { name: 'shape', structure: {} };
    default:
      return serializeTypeDeclaration(typeSymbol.valueDeclaration);
  }
}
