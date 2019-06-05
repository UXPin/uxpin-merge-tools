import { Warned } from '../../../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../context/getSerializationContext';
import { getJSDocDocumentation } from './getJSDocDocumentation';
import { getPropertyCustomDescriptors } from './getPropertyCustomDescriptiors';
import { getPropertyName } from './getPropertyName';
import { MethodSymbol } from './isMethodSignatureSymbol';
import { isPropertyRequired } from './isPropertyRequired';

export function convertMethodSignatureSymbolToPropertyDefinition(
  context:TSSerializationContext,
  methodSymbol:MethodSymbol,
):Warned<ComponentPropertyDefinition> {
  getPropertyCustomDescriptors(methodSymbol);
  return {
    result: {
      description: getJSDocDocumentation(context, methodSymbol),
      isRequired: isPropertyRequired(methodSymbol),
      name: getPropertyName(methodSymbol),
      type: { name: 'func', structure: {} },
      ...getPropertyCustomDescriptors(methodSymbol),
    },
    warnings: [],
  };
}
