import * as ts from 'typescript';

export function isFunctionalComponentWithReactForwardRef(node:ts.Node):boolean {
  let expression:ts.Identifier|ts.PropertyAccessExpression|undefined;

  if (ts.isExportAssignment(node)) { // export default forwardRef(() => {})
    expression = (ts.isCallExpression(node.expression) ? node.expression.expression : node.expression) as ts.Identifier;
  } else if (ts.isVariableStatement(node)
	  && ts.isCallExpression(node.declarationList?.declarations[0]?.initializer as ts.Node)
	) { // export Component = forwardRef(() => {});
  	expression = (
  		node.declarationList.declarations[0].initializer as ts.CallExpression
	  ).expression as ts.PropertyAccessExpression;
  }

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
