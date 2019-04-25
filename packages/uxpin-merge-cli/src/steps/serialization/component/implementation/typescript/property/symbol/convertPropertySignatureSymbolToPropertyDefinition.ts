import * as ts from 'typescript';
import { ComponentPropertyDefinition } from '../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../serializeTSComponent';
import { convertTypeToPropertyType } from '../type/node/convertTypeNodeToPropertyType';
import { getDefaultValueFromJSDoc } from './getDefaultValueFromJSDoc';
import { getJSDocDocumentation } from './getJSDocDocumentation';
import { getPropertyName } from './getPropertyName';
import { isPropertyRequired } from './isPropertyRequired';
import { PropertySymbol } from './isPropertySignatureSymbol';

export function convertPropertySignatureSymbolToPropertyDefinition(
  context:TSSerializationContext,
  propertySymbol:PropertySymbol,
):ComponentPropertyDefinition {
  const type:ts.Type = context.checker.getTypeFromTypeNode(propertySymbol.valueDeclaration.type!);

  return {
    description: getJSDocDocumentation(context, propertySymbol),
    isRequired: isPropertyRequired(propertySymbol),
    name: getPropertyName(propertySymbol),
    type: convertTypeToPropertyType(context, type),
    ...getDefaultValueFromJSDoc(propertySymbol),
  };
}
