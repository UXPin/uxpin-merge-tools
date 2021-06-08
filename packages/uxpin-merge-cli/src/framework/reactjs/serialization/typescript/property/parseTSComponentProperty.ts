import * as ts from 'typescript';
import { ParsedComponentProperty } from '../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { TSSerializationContext } from '../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { convertMethodSignatureSymbolToPropertyDefinition } from '../../../../../steps/serialization/component/implementation/typescript/property/symbol/convertMethodSignatureSymbolToPropertyDefinition';
import { convertPropertySignatureSymbolToPropertyDefinition } from '../../../../../steps/serialization/component/implementation/typescript/property/symbol/convertPropertySignatureSymbolToPropertyDefinition';
import { getValidSymbol } from '../../../../../steps/serialization/component/implementation/typescript/property/symbol/getValidSymbol';
import { isMethodSignatureSymbol } from '../../../../../steps/serialization/component/implementation/typescript/property/symbol/isMethodSignatureSymbol';
import { isPropertySignatureSymbol, PropertySymbol } from '../../../../../steps/serialization/component/implementation/typescript/property/symbol/isPropertySignatureSymbol';
import { DefaultProps } from '../component/getPropsTypeAndDefaultProps';

export function parseTSComponentProperty(
  context:TSSerializationContext,
  property:ts.Symbol,
  defaultProps:DefaultProps,
):ParsedComponentProperty | undefined {
  try {
    const propertySymbol:ts.Symbol | undefined = getValidSymbol(property);
    if (!propertySymbol) {
      return;
    }

    if (isPropertySignatureSymbol(propertySymbol)) {
      return propertySignatureToPropertyDefinition(context, propertySymbol, defaultProps);
    }

    if (isMethodSignatureSymbol(propertySymbol)) {
      return convertMethodSignatureSymbolToPropertyDefinition(context, propertySymbol);
    }
  } catch (e) {
    return;
  }
}

function propertySignatureToPropertyDefinition(
  context:TSSerializationContext,
  propSymbol:PropertySymbol,
  defaultProps:DefaultProps,
):ParsedComponentProperty {
  const prop:ParsedComponentProperty = convertPropertySignatureSymbolToPropertyDefinition(context, propSymbol);
  if (prop.name in defaultProps) {
    prop.defaultValue = { value: defaultProps[prop.name] };
  }

  return prop;
}
