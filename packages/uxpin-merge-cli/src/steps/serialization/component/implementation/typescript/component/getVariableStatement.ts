import * as ts from 'typescript';
import { getNodeName } from '../node/getNodeName';

function isVariableStatementWithProperName(node: ts.Node, functionName: string): node is ts.VariableStatement {
  return (
    ts.isVariableStatement(node) &&
    getNodeName(node.declarationList.declarations[0].initializer?.parent) === functionName
  );
}

export function getVariableStatement(
  sourceFile: ts.SourceFile,
  functionName: string
): ts.VariableStatement | undefined {
  let result: ts.VariableStatement | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (!result && isVariableStatementWithProperName(node, functionName)) {
      result = node;
    }
  });

  return result;
}
