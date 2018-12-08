import * as ts from 'typescript';
import { Warned } from '../../../../../common/warning/Warned';
import { ComponentPropertyDefinition } from '../ComponentPropertyDefinition';
import { findComponentFile } from './component/findComponentFile';
import { getPropsTypeAndDefaultProps } from './component/getPropsTypeAndDefaultProps';
import { isPropertySymbol } from './property/isPropertySymbol';
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
  const typeFromTypeNode:ts.Type = env.checker.getTypeFromTypeNode(propsTypeNode);
  const props:ts.Symbol[] = typeFromTypeNode.getProperties();
  const serializedProps:ComponentPropertyDefinition[] = props
    .filter(isPropertySymbol)
    .map((propSymbol) => {
      const definition:ComponentPropertyDefinition = convertTypeSymbolToPropertyDefinition(env, propSymbol);
      if (definition.name in defaultProps) {
        definition.defaultValue = { value: defaultProps[definition.name] };
      }
      return definition;
    });
  return { result: serializedProps, warnings: [] };
}
