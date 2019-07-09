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
import { getPropertiesFromType, TypeProps } from './property/type/getPropertiesFromType';
import { PropDefinitionSerializationResult } from '../PropDefinitionSerializationResult';

export function serializeComponentProperties(
  context:TSSerializationContext,
  componentDeclaration:ComponentDeclaration,
):Array<Warned<ComponentPropertyDefinition>> {
  const { propsTypeNode, defaultProps } = getPropsTypeAndDefaultProps(context, componentDeclaration);
  if (!propsTypeNode) {
    throw new Error('No component properties found');
  }

  const typeFromTypeNode:ts.Type = context.checker.getTypeFromTypeNode(propsTypeNode);
  const props:TypeProps = getPropertiesFromType(typeFromTypeNode);

  return [
    ...getComponentPropertiesDefinition(context, props.baseProps, defaultProps),
    ...getComponentPropertiesDefinition(context, props.exclusiveProps, defaultProps)
      .map((prop:PropDefinitionSerializationResult) => {
        return {
          ...prop,
          result: {
            ...prop.result,
            isRequired: false,
          },
        };
      }),
  ];
}

function getComponentPropertiesDefinition(
  context:TSSerializationContext,
  props:ts.Symbol[],
  defaultProps:DefaultProps,
):Array<PropDefinitionSerializationResult> {
  return props
    .map((propSymbol:ts.Symbol) => getPropertyDefinition(context, propSymbol, defaultProps))
    .filter(isValidDefinition);
}

function isValidDefinition(definition:PropDefinitionSerializationResult | undefined):definition is PropDefinitionSerializationResult {
  return definition !== undefined;
}

function getPropertyDefinition(
  context:TSSerializationContext,
  property:ts.Symbol,
  defaultProps:DefaultProps,
):Warned<ComponentPropertyDefinition> | undefined {
  if (isPropertySignatureSymbol(property)) {
    return propertySignatureToPropertyDefinition(context, property, defaultProps)
  }

  if (isMethodSignatureSymbol(property)) {
    return convertMethodSignatureSymbolToPropertyDefinition(context, property);
  }
}

function propertySignatureToPropertyDefinition(
  context:TSSerializationContext,
  propSymbol:PropertySymbol,
  defaultProps:DefaultProps,
):Warned<ComponentPropertyDefinition> {
  const prop:ComponentPropertyDefinition = convertPropertySignatureSymbolToPropertyDefinition(context, propSymbol);
  if (prop.name in defaultProps) {
    prop.defaultValue = { value: defaultProps[prop.name] };
  }
  return {
    result: prop,
    warnings: [],
  };
}
