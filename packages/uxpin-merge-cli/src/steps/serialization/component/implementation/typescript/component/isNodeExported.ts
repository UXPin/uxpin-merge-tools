import { find } from 'lodash';
import * as ts from 'typescript';
import { getNodeName } from '../node/getNodeName';

function isNodeNamePassedAsArgument(expression:ts.CallExpression, nodeName:string):boolean {
  return !!find(expression.arguments, (arg) => getNodeName(arg) === nodeName);
}

function hasProperName(nodeName:string, el:ts.ExportSpecifier):boolean {
  return getNodeName(el) === nodeName;
}

export function isNodeExported(node:ts.Node, nodeName:string):boolean {

  /**
   * Handling following cases:
   * export default Component
   * export HOC(Component)
   */
  if (ts.isExportAssignment(node)
    && (getNodeName(node) === nodeName || isNodeNamePassedAsArgument(node.expression as ts.CallExpression, nodeName))
  ) {
    return true;
  }

  /**
   * Handling following cases:
   * export { Component };
   * export { Component as default };
   */
  if (ts.isExportDeclaration(node) && node.exportClause) {
    const { elements } = node.exportClause;
    return !!find(elements, hasProperName.bind(null, nodeName));
  }

  return false;
}
