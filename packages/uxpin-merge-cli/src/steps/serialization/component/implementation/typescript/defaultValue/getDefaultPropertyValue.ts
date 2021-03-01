import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';

export type SupportedDefaultValue = number | string | boolean;

export function getDefaultPropertyValue(
  context:TSSerializationContext,
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
      return getDefaultValueFromIdentifier(context, valueInitializer as ts.Identifier);
    case ts.SyntaxKind.NewExpression:
      return getDefaultValueFromNewExpression(context, valueInitializer as ts.NewExpression);
    default:
      return;
  }
}

export function getDefaultValueFromNewExpression(
  context:TSSerializationContext,
  propertyInitializer:any,
):SupportedDefaultValue | undefined {
  if (propertyInitializer.expression.escapedText == 'Date') {
    return new Date(propertyInitializer.arguments[0].text).toJSON();
  }

  return false;
}

export function getDefaultValueFromIdentifier(
  context:TSSerializationContext,
  propertyInitializer:ts.Identifier,
):SupportedDefaultValue | undefined {
  const symbol:ts.Symbol | undefined = context.checker.getSymbolAtLocation(propertyInitializer);
  if (symbol && ts.isVariableDeclaration(symbol.valueDeclaration) && symbol.valueDeclaration.initializer) {
    return getDefaultPropertyValue(context, symbol.valueDeclaration.initializer);
  }
}
