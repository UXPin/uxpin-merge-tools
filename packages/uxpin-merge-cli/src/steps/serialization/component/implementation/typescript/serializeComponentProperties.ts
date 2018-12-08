import * as ts from 'typescript';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { findComponentFile } from './component/findComponentFile';
import { getPropsTypeAndDefaultProps } from './component/getPropsTypeAndDefaultProps';
import { convertTypeSymbolToPropertyDefinition } from './property/type/symbol/convertTypeSymbolToPropertyDefinition';
import { TSComponentSerializationEnv } from './serializeTSComponent';

export function serializeComponentProperties(env:TSComponentSerializationEnv):Warned<ComponentPropertyDefinition[]> {
  const { componentPath, componentName } = env;
  const componentFile:ts.SourceFile | undefined = findComponentFile(env, componentPath);
  if (!componentFile) {
    return {
      result: [], warnings: [{
        message: 'TypeScript compiler couldn\'t find component file',
        sourcePath: componentPath,
      }],
    };
  }
  const { propsTypeNode, defaultProps } = getPropsTypeAndDefaultProps(env, componentFile, componentName);
  if (!propsTypeNode) {
    return {
      result: [], warnings: [{
        message: 'Cannot find type of component properties',
        sourcePath: componentPath,
      }],
    };
  }
  const propsTypeSymbol:ts.Symbol = env.checker.getTypeFromTypeNode(propsTypeNode).symbol;
  if (!propsTypeSymbol || propsTypeSymbol.flags !== ts.SymbolFlags.Interface || !propsTypeSymbol.members) {
    return {
      result: [], warnings: [{
        message: 'Unsupported type of properties object – use interface declaration',
        sourcePath: componentPath,
      }],
    };
  }

  const serializedProps:ComponentPropertyDefinition[] = [];
  propsTypeSymbol.members.forEach((typeSymbol, propName) => {
    const propertyDefinition:ComponentPropertyDefinition | undefined =
      convertTypeSymbolToPropertyDefinition(env, typeSymbol, propName);
    if (propertyDefinition) {
      if (propName.toString() in defaultProps) {
        propertyDefinition.defaultValue = { value: defaultProps[propName.toString()] };
      }
      serializedProps.push(propertyDefinition);
    }
  });

  return { result: serializedProps, warnings: [] };
}
