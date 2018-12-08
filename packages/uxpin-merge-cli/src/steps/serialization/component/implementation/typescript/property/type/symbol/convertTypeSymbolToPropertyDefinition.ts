import * as ts from 'typescript';
import { ComponentPropertyDefinition } from '../../../../ComponentPropertyDefinition';
import { TSComponentSerializationEnv } from '../../../serializeTSComponent';
import { convertTypeNodeToPropertyType } from '../node/convertTypeNodeToPropertyType';

export function convertTypeSymbolToPropertyDefinition(
  env:TSComponentSerializationEnv,
  typeSymbol:ts.Symbol,
  propName:ts.__String,
):ComponentPropertyDefinition | undefined {
  if (!ts.isPropertySignature(typeSymbol.valueDeclaration)) {
    return;
  }
  return {
    description: ts.displayPartsToString(typeSymbol.getDocumentationComment(env.checker)),
    isRequired: isPropertyRequired(typeSymbol.valueDeclaration),
    name: propName.toString(),
    type: convertTypeNodeToPropertyType(env, typeSymbol.valueDeclaration.type!),
  };
}

type TSProperty = ts.PropertySignature | ts.PropertyDeclaration;

export function isPropertyRequired(declaration:TSProperty):boolean {
  return !declaration.questionToken;
}
