import { find } from 'lodash';
import * as ts from 'typescript';
import { getNodeName } from '../node/getNodeName';

export function isNodeExported(node:ts.Node, nodeName:string):boolean {
  if (ts.isExportAssignment(node) && getNodeName(node) === nodeName) {
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
