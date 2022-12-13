import * as ts from 'typescript';
import { DefaultProps } from '../component/getPropsTypeAndDefaultProps';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { getDefaultPropertyValue, SupportedDefaultValue } from './getDefaultPropertyValue';

export function getDefaultPropsFromParamDestructuring(
  context: TSSerializationContext,
  func: ts.FunctionLikeDeclaration
): DefaultProps {
  if (!func.parameters || !func.parameters[0] || !ts.isObjectBindingPattern(func.parameters[0].name)) {
    return {};
  }
  const binding: ts.ObjectBindingPattern = func.parameters[0].name;
  return binding.elements.reduce<DefaultProps>((defaults, element) => {
    if (isBindingElementWithIdentifierNameAndInitializer(element)) {
      const defaultValue: SupportedDefaultValue | undefined = getDefaultPropertyValue(context, element.initializer);
      if (typeof defaultValue !== 'undefined') {
        defaults[getNodeName(element)!.toString()] = defaultValue;
      }
    }
    return defaults;
  }, {});
}

function isBindingElementWithIdentifierNameAndInitializer(
  element: ts.BindingElement
): element is ts.BindingElement & { name: ts.Identifier } & Required<Pick<ts.BindingElement, 'initializer'>> {
  return !!element.initializer && ts.isIdentifier(element.name);
}
