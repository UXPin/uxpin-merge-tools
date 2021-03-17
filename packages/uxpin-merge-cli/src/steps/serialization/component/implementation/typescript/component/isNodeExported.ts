import { find } from 'lodash';
import * as ts from 'typescript';
import { getNodeName } from '../node/getNodeName';

function isNodeNamePassedAsArgument(expression:ts.CallExpression, nodeName:string):boolean {
  return !!find(expression.arguments, (arg) => getNodeName(arg) === nodeName);
}

export function isNodeExported(node:ts.Node, nodeName:string):boolean {
  if (ts.isExportAssignment(node)
		&& (getNodeName(node) === nodeName || isNodeNamePassedAsArgument(node.expression as ts.CallExpression, nodeName))
	) {
  	return true;
  }

  if (ts.isExportDeclaration(node) && node.exportClause) {
    const { elements } = node.exportClause;
    return !!find(
			elements,
			(el:ts.ExportSpecifier) => getNodeName(el) === nodeName,
		);
  }

  return false;
}
