import * as ts from 'typescript';
import { ClassComponentDeclaration } from '../../../../../steps/serialization/component/implementation/typescript/component/getPropsTypeAndDefaultProps';
import { TSSerializationContext } from '../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { getNodeName } from '../../../../../steps/serialization/component/implementation/typescript/node/getNodeName';
import { DefaultProps } from '../component/getPropsTypeAndDefaultProps';
import { isDefaultPropertiesStaticProperty } from '../node/property/isDefaultPropertiesStaticProperty';
import { getDefaultPropertyValue, SupportedDefaultValue } from './getDefaultPropertyValue';

export function getDefaultPropsOfClassComponent(
  context:TSSerializationContext,
  componentClass:ClassComponentDeclaration,
):DefaultProps {
  const defaultsProp:ts.PropertyDeclaration | undefined =
    componentClass.members.find(isDefaultPropertiesStaticProperty);
  if (defaultsProp && defaultsProp.initializer && ts.isObjectLiteralExpression(defaultsProp.initializer)) {
    return defaultsProp.initializer.properties.reduce<DefaultProps>((defaults, property) => {
      if (ts.isPropertyAssignment(property)) {
        const defaultValue:SupportedDefaultValue | undefined = getDefaultPropertyValue(context, property.initializer);
        if (typeof defaultValue !== 'undefined') {
          defaults[getNodeName(property)!.toString()] = defaultValue;
        }
      }
      return defaults;
    }, {});
  }
  return {};
}
