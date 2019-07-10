import * as ts from 'typescript';
import { getWarnedResult } from '../../../../../../common/warning/getWarnedResult';
import { ComponentPropertyDefinition } from '../../ComponentPropertyDefinition';
import { PropDefinitionSerializationResult } from '../../PropDefinitionSerializationResult';
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
):PropDefinitionSerializationResult | undefined {
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
):PropDefinitionSerializationResult {
  const prop:ComponentPropertyDefinition = convertPropertySignatureSymbolToPropertyDefinition(context, propSymbol);
  if (prop.name in defaultProps) {
    prop.defaultValue = { value: defaultProps[prop.name] };
  }

  return getWarnedResult(prop);
}
