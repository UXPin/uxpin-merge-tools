import * as ts from 'typescript';
import {PropertyType} from '../../../../ComponentPropertyDefinition';
import {TSSerializationContext} from '../../../serializeTSComponent';
import {serializeAsUnsupportedType} from './serializeAsUnsupportedType';
import {serializeLiteralType} from './serializeLiteralType';
import {serializeTypeLiteral} from './serializeTypeLiteral';
import {serializeTypeReference, TYPES_MAP} from './serializeTypeReference';
import {serializeUnionType} from './serializeUnionType';
import {serializeIndexedAccessType} from "./serializeIndexedAccessType";

export function convertTypeNodeToPropertyType(context:TSSerializationContext, typeNode:ts.TypeNode):PropertyType {
  const type = context.checker.getTypeFromTypeNode(typeNode)
  switch (typeNode.kind) {
    case ts.SyntaxKind.StringKeyword:
      return { name: 'string', structure: {} };
    case ts.SyntaxKind.NumberKeyword:
      return { name: 'number', structure: {} };
    case ts.SyntaxKind.BooleanKeyword:
      return { name: 'boolean', structure: {} };
    case ts.SyntaxKind.AnyKeyword:
      return { name: 'any', structure: {} };
    case ts.SyntaxKind.ArrayType:
      return { name: 'array', structure: {} };
    case ts.SyntaxKind.FunctionType:
      return { name: 'func', structure: {} };
    case ts.SyntaxKind.ObjectKeyword:
      return { name: 'shape', structure: {} };
    case ts.SyntaxKind.UnionType:
      return serializeUnionType(context, typeNode as ts.UnionTypeNode);
    case ts.SyntaxKind.LiteralType:
      return serializeLiteralType(typeNode as ts.LiteralTypeNode);
    case ts.SyntaxKind.TypeReference:
      return serializeTypeReference(context, typeNode as ts.TypeReferenceNode);
    case ts.SyntaxKind.TypeLiteral:
      return serializeTypeLiteral(typeNode as ts.TypeLiteralNode);
    case ts.SyntaxKind.IndexedAccessType:
      return {}//serializeIndexedAccessType(context, typeNode as ts.IndexedAccessTypeNode);
    default:
      return serializeAsUnsupportedType(typeNode);
  }
}

export function convertTypeToPropertyType(context:TSSerializationContext, type:ts.Type):PropertyType {
  if(type.flags & ts.TypeFlags.String){
    return  { name: 'string', structure: {}}
  }

  if(type.flags & ts.TypeFlags.Number){
    return  { name: 'number', structure: {} }
  }

  if(type.flags & ts.TypeFlags.Boolean){
    return  { name: 'boolean', structure: {} }
  }

  if(type.flags & ts.TypeFlags.Any){
    return  { name: 'any', structure: {} }
  }

  if(type.flags & ts.TypeFlags.Object || type.flags & ts.TypeFlags.NonPrimitive){
    if(!!type.getCallSignatures().length){ //functions are object, so we have to check if object is stg callable
      return { name: 'func', structure: {} }
    }

    const typeSymbol:ts.Symbol = type.symbol || type.aliasSymbol;
    if (typeSymbol && typeSymbol.escapedName.toString() in TYPES_MAP) {
      return TYPES_MAP[typeSymbol.escapedName.toString()];
    }

    return  { name: 'shape', structure: {} }
  }

  if(type.flags & ts.TypeFlags.Union){
    const typeSymbol:ts.Symbol = type.symbol || type.aliasSymbol;
    if (typeSymbol && typeSymbol.escapedName.toString() in TYPES_MAP) {
      return TYPES_MAP[typeSymbol.escapedName.toString()];
    }
    return serializeUnionType(context, type as ts.UnionType)
  }

  if(type.flags & ts.TypeFlags.Literal){
    return  serializeLiteralType(type as ts.LiteralType)
  }

  return serializeAsUnsupportedType(type);
}
