import * as ts from 'typescript';
import { getVariableStatement } from './getVariableStatement';

/**
 * Example use case:
 * const _Component = () => {};
 * export const Component = forwardRef(_Component);
 * when Component variable declaration is passed it returns the function expression assigned to the variable _Component
 */
export function findFunctionFromVariableDeclaration(
	sourceFile:ts.SourceFile,
	variableDeclaration:ts.VariableDeclaration,
):ts.ArrowFunction | ts.FunctionExpression | undefined {
  const argument:ts.Expression = (variableDeclaration.initializer as ts.CallExpression).arguments[0];
  if (ts.isIdentifier(argument)) {
    const internalVariable:ts.VariableStatement | undefined  = getVariableStatement(
			sourceFile,
			(argument as ts.Identifier).escapedText as string,
		);
    const initializer:any = internalVariable?.declarationList?.declarations[0]?.initializer;

    if (initializer && ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) {
      return initializer;
    }
  }

  if (ts.isArrowFunction(argument) || ts.isFunctionExpression(argument)) {
    return argument;
  }
}
