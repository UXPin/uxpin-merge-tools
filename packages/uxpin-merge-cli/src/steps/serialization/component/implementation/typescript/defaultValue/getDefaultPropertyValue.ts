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
    case ts.SyntaxKind.PropertyAccessExpression:
      return getDefaultValueFromPropertyAccessExpression(context, valueInitializer as ts.Identifier);
    default:
      return;
  }
}

export function getDefaultValueFromPropertyAccessExpression(
  context:TSSerializationContext,
  propertyInitializer:any,
):SupportedDefaultValue | undefined {
  const symbol:ts.Symbol | undefined = context.checker.getSymbolAtLocation(propertyInitializer);
  if (symbol && ts.isEnumMember(symbol.valueDeclaration) && symbol.valueDeclaration.initializer) {
    let initializer:ts.Identifier = symbol.valueDeclaration.name as ts.Identifier;
    return initializer.escapedText as string;
  }

  return;
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
