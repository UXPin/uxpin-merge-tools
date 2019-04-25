import { PropertyType } from '../../../../ComponentPropertyDefinition';

export const TYPES_MAP:{ [typeName:string]:PropertyType } = {
  Array: { name: 'array', structure: {} },
  ReactElement: { name: 'element', structure: {} },
  ReactNode: { name: 'node', structure: {} },
};
/*

export function serializeTypeReference(context:TSSerializationContext, type:ts.Type):PropertyType {
  //const typeFromTypeNode:ts.Type = context.checker.getTypeFromTypeNode(typeNode);

  const typeSymbol:ts.Symbol = type.symbol || type.aliasSymbol;
  if (typeSymbol.escapedName.toString() in TYPES_MAP) {
    return TYPES_MAP[typeSymbol.escapedName.toString()];
  }

  return serializeAsUnsupportedType(type);

 /!* switch (typeSymbol.flags) {
    case ts.SymbolFlags.Interface:
      return { name: 'shape', structure: {} };
    default:
      return getTypeByDeclaration(typeSymbol, typeNode);
  }*!/
}

export function getTypeByDeclaration(typeSymbol:ts.Symbol, typeNode:ts.TypeReferenceNode|ts.IndexedAccessTypeNode):PropertyType {
  const declaration:ts.Declaration | undefined = typeSymbol.valueDeclaration || typeSymbol.declarations[0];
  if (!declaration) {
    return serializeAsUnsupportedType(typeNode);
  }
  return serializeTypeDeclaration(declaration);
}
*/
