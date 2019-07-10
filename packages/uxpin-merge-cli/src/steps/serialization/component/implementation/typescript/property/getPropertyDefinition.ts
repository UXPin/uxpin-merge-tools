import * as ts from 'typescript';
import { ComponentPropertyDefinition } from '../../ComponentPropertyDefinition';
import { DefaultProps } from '../component/getPropsTypeAndDefaultProps';
import { TSSerializationContext } from '../context/getSerializationContext';
import { convertMethodSignatureSymbolToPropertyDefinition } from './symbol/convertMethodSignatureSymbolToPropertyDefinition';
import { convertPropertySignatureSymbolToPropertyDefinition } from './symbol/convertPropertySignatureSymbolToPropertyDefinition';
import { isMethodSignatureSymbol } from './symbol/isMethodSignatureSymbol';
import { isPropertySignatureSymbol, PropertySymbol } from './symbol/isPropertySignatureSymbol';

export function getPropertyDefinition(
  context:TSSerializationContext,
  property:ts.Symbol,
  defaultProps:DefaultProps,
):ComponentPropertyDefinition | undefined {
  if (isPropertySignatureSymbol(property)) {
    return propertySignatureToPropertyDefinition(context, property, defaultProps);
  }

  if (isMethodSignatureSymbol(property)) {
    return convertMethodSignatureSymbolToPropertyDefinition(context, property);
  }
}

function propertySignatureToPropertyDefinition(
  context:TSSerializationContext,
  propSymbol:PropertySymbol,
  defaultProps:DefaultProps,
):ComponentPropertyDefinition {
  const prop:ComponentPropertyDefinition = convertPropertySignatureSymbolToPropertyDefinition(context, propSymbol);
  if (prop.name in defaultProps) {
    prop.defaultValue = { value: defaultProps[prop.name] };
  }

  return prop;
}
