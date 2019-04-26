import * as ts from 'typescript';
import { PropertyType } from '../../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../context/getSerializationContext';
import { serializeTypeDeclaration } from '../declaration/serializeTypeDeclaration';
import { serializeAsUnsupportedType } from './serializeAsUnsupportedType';

const TYPES_MAP:{ [typeName:string]:PropertyType } = {
  Array: { name: 'array', structure: {} },
  ReactElement: { name: 'element', structure: {} },
  ReactNode: { name: 'node', structure: {} },
};

export function serializeTypeReference(context:TSSerializationContext, typeNode:ts.TypeReferenceNode):PropertyType {
  const typeFromTypeNode:ts.Type = context.checker.getTypeFromTypeNode(typeNode);
  const typeSymbol:ts.Symbol = typeFromTypeNode.symbol || typeFromTypeNode.aliasSymbol;
  if (typeSymbol.escapedName.toString() in TYPES_MAP) {
    return TYPES_MAP[typeSymbol.escapedName.toString()];
  }
  switch (typeSymbol.flags) {
    case ts.SymbolFlags.Interface:
      return { name: 'shape', structure: {} };
    default:
      return getTypeByDeclaration(typeSymbol, typeNode);
  }
}

function getTypeByDeclaration(typeSymbol:ts.Symbol, typeNode:ts.TypeReferenceNode):PropertyType {
  const declaration:ts.Declaration | undefined = typeSymbol.valueDeclaration || typeSymbol.declarations[0];
  if (!declaration) {
    return serializeAsUnsupportedType(typeNode);
  }
  return serializeTypeDeclaration(declaration);
}
