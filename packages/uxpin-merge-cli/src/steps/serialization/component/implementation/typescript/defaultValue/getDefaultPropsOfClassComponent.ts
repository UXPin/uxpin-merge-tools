import * as ts from 'typescript';
import { ClassComponentDeclaration, DefaultProps } from '../component/getPropsTypeAndDefaultProps';
import { getNodeName } from '../node/getNodeName';
import { isDefaultPropertiesStaticProperty } from '../node/property/isDefaultPropertiesStaticProperty';
import { TSComponentSerializationEnv } from '../serializeTSComponent';

export function getDefaultPropsOfClassComponent(
  env:TSComponentSerializationEnv,
  componentClass:ClassComponentDeclaration,
):DefaultProps {
  const defaultsProp:ts.PropertyDeclaration | undefined =
    componentClass.members.find(isDefaultPropertiesStaticProperty);
  if (defaultsProp && defaultsProp.initializer && ts.isObjectLiteralExpression(defaultsProp.initializer)) {
    return defaultsProp.initializer.properties.reduce<DefaultProps>((defaults, property) => {
      if (ts.isPropertyAssignment(property)) {
        const defaultValue:SupportedDefaultValue | undefined = getDefaultPropertyValue(env, property.initializer);
        if (typeof defaultValue !== 'undefined') {
          defaults[getNodeName(property)!.toString()] = defaultValue;
        }
      }
      return defaults;
    }, {});
  }
  return {};
}

type SupportedDefaultValue = number | string | boolean;

export function getDefaultPropertyValue(
  env:TSComponentSerializationEnv,
  valueInitializer:ts.Expression,
):SupportedDefaultValue | undefined {
  switch (valueInitializer.kind) {
    case ts.SyntaxKind.StringLiteral:
      return (valueInitializer as ts.StringLiteral).text;
    case ts.SyntaxKind.NumericLiteral:
      return parseInt((valueInitializer as ts.NumericLiteral).text, 10);
    case ts.SyntaxKind.TrueKeyword:
      return true;
    case ts.SyntaxKind.FalseKeyword:
      return false;
    case ts.SyntaxKind.Identifier:
      return getDefaultValueFromIdentifier(env, valueInitializer as ts.Identifier);
    default:
      return;
  }
}

export function getDefaultValueFromIdentifier(
  env:TSComponentSerializationEnv,
  propertyInitializer:ts.Identifier,
):SupportedDefaultValue | undefined {
  const symbol:ts.Symbol | undefined = env.checker.getSymbolAtLocation(propertyInitializer);
  if (symbol && ts.isVariableDeclaration(symbol.valueDeclaration) && symbol.valueDeclaration.initializer) {
    return getDefaultPropertyValue(env, symbol.valueDeclaration.initializer);
  }
}
