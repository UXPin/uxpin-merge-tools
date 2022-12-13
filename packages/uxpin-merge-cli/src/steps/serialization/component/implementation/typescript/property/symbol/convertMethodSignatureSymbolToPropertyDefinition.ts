import { ParsedComponentProperty } from '../../../ComponentPropertyDefinition';
import { TSSerializationContext } from '../../context/getSerializationContext';
import { getJSDocDocumentation } from './getJSDocDocumentation';
import { getPropertyCustomDescriptors } from './getPropertyCustomDescriptiors';
import { getPropertyName } from './getPropertyName';
import { MethodSymbol } from './isMethodSignatureSymbol';
import { isPropertyRequired } from './isPropertyRequired';

export function convertMethodSignatureSymbolToPropertyDefinition(
  context: TSSerializationContext,
  methodSymbol: MethodSymbol
): ParsedComponentProperty {
  const name: string | undefined = getPropertyName(methodSymbol);

  if (!name) {
    throw new Error('Cannot get name from method symbol');
  }

  return {
    description: getJSDocDocumentation(context, methodSymbol),
    isRequired: isPropertyRequired(methodSymbol),
    name,
    type: { name: 'func', structure: {} },
    ...getPropertyCustomDescriptors(methodSymbol),
  };
}
