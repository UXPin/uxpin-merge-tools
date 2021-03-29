import * as ts from 'typescript';

function extractExpression(node:ts.Node):ts.Identifier|ts.PropertyAccessExpression|undefined {
  if (ts.isCallExpression(node)) {
    return node.expression as ts.Identifier;
  }

  if (ts.isExportAssignment(node)) {
    return (ts.isCallExpression(node.expression) ? node.expression.expression : node.expression) as ts.Identifier;
  }

  if (ts.isVariableStatement(node)
		&& ts.isCallExpression(node.declarationList?.declarations[0]?.initializer as ts.Node)
	) {
    return extractExpression(node.declarationList.declarations[0].initializer as ts.CallExpression);
  }

  if (ts.isVariableDeclaration(node) && ts.isCallExpression(node.initializer as ts.CallExpression)) {
    return extractExpression(node.initializer as ts.CallExpression);
  }
}

export function isFunctionalComponentWithReactForwardRef(node:ts.Node):boolean {
  const expression:ts.Identifier|ts.PropertyAccessExpression|undefined = extractExpression(node);

  if (!expression) {
  	return false;
  }

  if (ts.isPropertyAccessExpression(expression as ts.PropertyAccessExpression)) {
  	return ((expression as ts.PropertyAccessExpression)?.expression as ts.Identifier)?.escapedText === 'React'
		  && (expression as ts.PropertyAccessExpression)?.name?.escapedText === 'forwardRef';
  }

  if (ts.isIdentifier(expression as ts.Identifier)) {
  	return (expression as ts.Identifier)?.escapedText === 'forwardRef';
  }

  return false;
}
