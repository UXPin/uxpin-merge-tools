import { parse } from 'path';
import * as ts from 'typescript';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { findComponentFile } from './component/findComponentFile';
import { DefaultProps, getPropsTypeAndDefaultProps } from './component/getPropsTypeAndDefaultProps';
import { TSSerializationContext } from './context/getSerializationContext';
import { convertMethodSignatureSymbolToPropertyDefinition } from './property/symbol/convertMethodSignatureSymbolToPropertyDefinition';
import { convertPropertySignatureSymbolToPropertyDefinition } from './property/symbol/convertPropertySignatureSymbolToPropertyDefinition';
import { isMethodSignatureSymbol } from './property/symbol/isMethodSignatureSymbol';
import { isPropertySignatureSymbol, PropertySymbol } from './property/symbol/isPropertySignatureSymbol';

export function serializeComponentProperties(context:TSSerializationContext):Warned<ComponentPropertyDefinition[]> {
  const { componentPath } = context;
  const componentName:string = parse(componentPath).name;
  const componentFile:ts.SourceFile | undefined = findComponentFile(context, componentPath);
  if (!componentFile) {
    throw new Error('TypeScript compiler couldn\'t find component file');
  }
  const { propsTypeNode, defaultProps } = getPropsTypeAndDefaultProps(context, componentFile, componentName);
  if (!propsTypeNode) {
    throw new Error('No component properties found');
  }
  const typeFromTypeNode:ts.Type = context.checker.getTypeFromTypeNode(propsTypeNode);
  const props:ts.Symbol[] = typeFromTypeNode.getProperties();
  const serializedProps:ComponentPropertyDefinition[] = props.reduce((properties, propSymbol) => {
    if (isPropertySignatureSymbol(propSymbol)) {
      properties.push(propertySignatureToPropertyDefinition(context, propSymbol, defaultProps));
    }
    if (isMethodSignatureSymbol(propSymbol)) {
      properties.push(convertMethodSignatureSymbolToPropertyDefinition(context, propSymbol));
    }
    return properties;
  }, [] as ComponentPropertyDefinition[]);
  return { result: serializedProps, warnings: [] };
}

function propertySignatureToPropertyDefinition(
  env:TSSerializationContext,
  propSymbol:PropertySymbol,
  defaultProps:DefaultProps,
):ComponentPropertyDefinition {
  const prop:ComponentPropertyDefinition = convertPropertySignatureSymbolToPropertyDefinition(env, propSymbol);
  if (prop.name in defaultProps) {
    prop.defaultValue = { value: defaultProps[prop.name] };
  }
  return prop;
}
