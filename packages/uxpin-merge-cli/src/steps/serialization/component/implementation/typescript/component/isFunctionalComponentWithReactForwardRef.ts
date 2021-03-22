import * as ts from 'typescript';

export function isFunctionalComponentWithReactForwardRef(node:ts.Node):boolean {
  if (!ts.isVariableStatement(node)
	  || !ts.isCallExpression(node.declarationList?.declarations[0]?.initializer as ts.Node)
	) {
    return false;
  }

  if (ts.isPropertyAccessExpression(
  	(node.declarationList.declarations[0].initializer as ts.CallExpression).expression)
  ) {
	  const expression:ts.PropertyAccessExpression = (
		  node.declarationList.declarations[0].initializer as ts.CallExpression
	  ).expression as ts.PropertyAccessExpression;

	  return (expression?.expression as ts.Identifier)?.escapedText === 'React'
		  && expression?.name?.escapedText === 'forwardRef';
  }

  if (ts.isIdentifier((node.declarationList.declarations[0].initializer as ts.CallExpression).expression)) {
  	const expression:ts.Identifier = (
  		node.declarationList.declarations[0].initializer as ts.CallExpression
	  ).expression as ts.Identifier;
  	return expression?.escapedText === 'forwardRef';
  }

  return false;
}
