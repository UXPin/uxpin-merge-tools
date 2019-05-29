import * as ts from 'typescript';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import {
  ComponentDeclaration,
  DefaultProps,
  getPropsTypeAndDefaultProps,
} from './component/getPropsTypeAndDefaultProps';
import { TSSerializationContext } from './context/getSerializationContext';
import { convertMethodSignatureSymbolToPropertyDefinition } from './property/symbol/convertMethodSignatureSymbolToPropertyDefinition';
import { convertPropertySignatureSymbolToPropertyDefinition } from './property/symbol/convertPropertySignatureSymbolToPropertyDefinition';
import { isMethodSignatureSymbol } from './property/symbol/isMethodSignatureSymbol';
import { isPropertySignatureSymbol, PropertySymbol } from './property/symbol/isPropertySignatureSymbol';

export function serializeComponentProperties(
  context:TSSerializationContext,
  componentDeclaration:ComponentDeclaration,
):Array<Warned<ComponentPropertyDefinition>> {
  const { propsTypeNode, defaultProps } = getPropsTypeAndDefaultProps(context, componentDeclaration);
  if (!propsTypeNode) {
    throw new Error('No component properties found');
  }

  const typeFromTypeNode:ts.Type = context.checker.getTypeFromTypeNode(propsTypeNode);
  const props:ts.Symbol[] = typeFromTypeNode.getProperties();
  return props.reduce((properties, propSymbol) => {
    if (isPropertySignatureSymbol(propSymbol)) {
      properties.push(propertySignatureToPropertyDefinition(context, propSymbol, defaultProps));
    }

    if (isMethodSignatureSymbol(propSymbol)) {
      properties.push(convertMethodSignatureSymbolToPropertyDefinition(context, propSymbol));
    }

    return properties;
  }, [] as Array<Warned<ComponentPropertyDefinition>>);
}

function propertySignatureToPropertyDefinition(
  env:TSSerializationContext,
  propSymbol:PropertySymbol,
  defaultProps:DefaultProps,
):Warned<ComponentPropertyDefinition> {
  const prop:ComponentPropertyDefinition = convertPropertySignatureSymbolToPropertyDefinition(env, propSymbol);
  if (prop.name in defaultProps) {
    prop.defaultValue = { value: defaultProps[prop.name] };
  }
  return {
    result: prop,
    warnings: [],
  };
}
