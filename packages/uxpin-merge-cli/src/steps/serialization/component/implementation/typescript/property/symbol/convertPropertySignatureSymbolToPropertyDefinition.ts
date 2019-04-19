import { ComponentPropertyDefinition } from '../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../serializeTSComponent';
import { convertTypeNodeToPropertyType } from '../type/node/convertTypeNodeToPropertyType';
import { getDefaultValueFromJSDoc } from './getDefaultValueFromJSDoc';
import { getJSDocDocumentation } from './getJSDocDocumentation';
import { getPropertyName } from './getPropertyName';
import { isPropertyRequired } from './isPropertyRequired';
import { PropertySymbol } from './isPropertySignatureSymbol';

export function convertPropertySignatureSymbolToPropertyDefinition(
  context:TSSerializationContext,
  propertySymbol:PropertySymbol,
):ComponentPropertyDefinition {
  return {
    description: getJSDocDocumentation(context, propertySymbol),
    isRequired: isPropertyRequired(propertySymbol),
    name: getPropertyName(propertySymbol),
    type: convertTypeNodeToPropertyType(context, propertySymbol.valueDeclaration.type!),
    ...getDefaultValueFromJSDoc(propertySymbol),
  };
}
