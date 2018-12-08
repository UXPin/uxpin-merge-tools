import * as ts from 'typescript';
import { ComponentPropertyDefinition } from '../../../../ComponentPropertyDefinition';
import { getNodeName } from '../../../node/getNodeName';
import { TSComponentSerializationEnv } from '../../../serializeTSComponent';
import { PropertySymbol } from '../../isPropertySymbol';
import { convertTypeNodeToPropertyType } from '../node/convertTypeNodeToPropertyType';

export function convertTypeSymbolToPropertyDefinition(
  env:TSComponentSerializationEnv,
  propertySymbol:PropertySymbol,
):ComponentPropertyDefinition {
  return {
    description: ts.displayPartsToString(propertySymbol.getDocumentationComment(env.checker)),
    isRequired: isPropertyRequired(propertySymbol.valueDeclaration),
    name: getNodeName(propertySymbol.valueDeclaration)!.toString(),
    type: convertTypeNodeToPropertyType(env, propertySymbol.valueDeclaration.type!),
  };
}

type TSProperty = ts.PropertySignature | ts.PropertyDeclaration;

export function isPropertyRequired(declaration:TSProperty):boolean {
  return !declaration.questionToken;
}
