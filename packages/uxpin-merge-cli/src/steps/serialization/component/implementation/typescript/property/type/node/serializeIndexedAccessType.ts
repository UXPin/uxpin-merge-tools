import {TSSerializationContext} from "../../../serializeTSComponent";
import * as ts from "typescript";
import {PropertyType} from "../../../../ComponentPropertyDefinition";
import {getTypeByDeclaration} from "./serializeTypeReference";
import {convertTypeNodeToPropertyType} from "./convertTypeNodeToPropertyType";

export function serializeIndexedAccessType(context: TSSerializationContext, typeNode: ts.IndexedAccessTypeNode): PropertyType {
    //const index = typeNode.indexType.literal.text;
    const typeFromTypeNode:ts.Type = context.checker.getTypeFromTypeNode(typeNode);
    const typeFlags = typeFromTypeNode.getFlags();
    const typeSymbol = typeFromTypeNode.symbol || typeFromTypeNode.aliasSymbol;

    switch (typeFlags) {
        case ts.TypeFlags.String:
            return { name: 'string', structure: {} };
        default:
            return getTypeByDeclaration(typeSymbol, typeNode);
    }
}
