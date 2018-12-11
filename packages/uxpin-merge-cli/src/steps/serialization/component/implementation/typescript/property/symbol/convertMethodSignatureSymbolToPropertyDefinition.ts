import { ComponentPropertyDefinition } from '../../../ComponentPropertyDefinition';
import { TSComponentSerializationEnv } from '../../serializeTSComponent';
import { getJSDocDocumentation } from './getJSDocDocumentation';
import { getPropertyName } from './getPropertyName';
import { MethodSymbol } from './isMethodSignatureSymbol';
import { isPropertyRequired } from './isPropertyRequired';

export function convertMethodSignatureSymbolToPropertyDefinition(
  context:TSComponentSerializationEnv,
  methodSymbol:MethodSymbol,
):ComponentPropertyDefinition {
  return {
    description: getJSDocDocumentation(context, methodSymbol),
    isRequired: isPropertyRequired(methodSymbol),
    name: getPropertyName(methodSymbol),
    type: { name: 'func', structure: {} },
  };
}
