import * as ts from 'typescript';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { findComponentFile } from './component/findComponentFile';
import { DefaultProps, getPropsTypeAndDefaultProps } from './component/getPropsTypeAndDefaultProps';
import { convertMethodSignatureSymbolToPropertyDefinition } from './property/symbol/convertMethodSignatureSymbolToPropertyDefinition';
import { convertPropertySignatureSymbolToPropertyDefinition } from './property/symbol/convertPropertySignatureSymbolToPropertyDefinition';
import { isMethodSignatureSymbol } from './property/symbol/isMethodSignatureSymbol';
import { isPropertySignatureSymbol, PropertySymbol } from './property/symbol/isPropertySignatureSymbol';
import { TSSerializationContext } from './serializeTSComponent';

export function serializeComponentProperties(context:TSSerializationContext):Warned<ComponentPropertyDefinition[]> {
  const { componentPath, componentName } = context;
  const componentFile:ts.SourceFile | undefined = findComponentFile(context, componentPath);
  if (!componentFile) {
    return {
      result: [], warnings: [{
        message: 'TypeScript compiler couldn\'t find component file',
        sourcePath: componentPath,
      }],
    };
  }
  const { propsTypeNode, defaultProps } = getPropsTypeAndDefaultProps(context, componentFile, componentName);
  if (!propsTypeNode) {
    return {
      result: [], warnings: [{
        message: 'Cannot find type of component properties',
        sourcePath: componentPath,
      }],
    };
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
