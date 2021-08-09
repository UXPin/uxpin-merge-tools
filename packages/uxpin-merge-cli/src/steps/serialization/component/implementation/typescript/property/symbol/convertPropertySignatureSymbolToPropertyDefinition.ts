import * as ts from 'typescript';
import { ParsedComponentProperty } from '../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../context/getSerializationContext';
import { convertTypeToPropertyType } from '../type/node/convertTypeToPropertyType';
import { getDefaultValueFromJSDoc } from './getDefaultValueFromJSDoc';
import { getJSDocDocumentation } from './getJSDocDocumentation';
import { getPropertyCustomDescriptors } from './getPropertyCustomDescriptiors';
import { getPropertyName } from './getPropertyName';
import { isPropertyRequired } from './isPropertyRequired';
import { PropertySymbol } from './isPropertySignatureSymbol';

export function convertPropertySignatureSymbolToPropertyDefinition(
  context:TSSerializationContext,
  propertySymbol:PropertySymbol,
):ParsedComponentProperty {
  const type:ts.Type = context.checker.getTypeFromTypeNode(propertySymbol.valueDeclaration.type!);
  const name:string | undefined = getPropertyName(propertySymbol);

  if (!name) {
    throw new Error('Cannot get name from property symbol');
  }

  return {
    description: getJSDocDocumentation(context, propertySymbol),
    isRequired: isPropertyRequired(propertySymbol),
    name,
    type: convertTypeToPropertyType(context, type, propertySymbol.getJsDocTags()),
    ...getDefaultValueFromJSDoc(propertySymbol),
    ...getPropertyCustomDescriptors(propertySymbol),
  };
}
