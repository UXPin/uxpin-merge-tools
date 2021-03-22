import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { isExported } from './isExported';
import { isFunctionalComponentWithReactForwardRef } from './isFunctionalComponentWithReactForwardRef';
import { isNodeExported } from './isNodeExported';

function getVariableStatement(sourceFile:ts.SourceFile, functionName:string):ts.VariableStatement | undefined {
  let result:ts.VariableStatement | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (!result
      && ts.isVariableStatement(node)
      && getNodeName(node.declarationList.declarations[0].initializer?.parent) === functionName
    ) {
      result = node;
    }
  });

  return result;
}

function getFunctionDeclaration(
  sourceFile:ts.SourceFile,
  functionName:string,
):ts.FunctionDeclaration | ts.ArrowFunction | undefined {
  const variable:ts.VariableStatement | undefined = getVariableStatement(sourceFile, functionName);

  if (variable && isFunctionalComponentWithReactForwardRef(variable)) {
    const argument:ts.Expression = (
      variable.declarationList.declarations[0].initializer as ts.CallExpression
    ).arguments[0];

    if (ts.isArrowFunction(argument)) {
      return argument;
    }
  }
}

export function findExportedFunctionWithReactForwardRef(
  context:TSSerializationContext,
  functionName:string,
):ts.FunctionDeclaration | ts.ArrowFunction | undefined {
  const variable:ts.VariableStatement | undefined = getVariableStatement(context.file, functionName);
  const result:ts.FunctionDeclaration | ts.ArrowFunction | undefined = getFunctionDeclaration(
    context.file,
    functionName,
  );

  if (variable && result && isExported(variable)) {
    return result;
  }

  let isFunctionExported:boolean = false;

  ts.forEachChild(context.file, (node) => {
    if (!isFunctionExported) {
      isFunctionExported = isNodeExported(node, functionName);
    }
  });

  return isFunctionExported ? result : undefined;
}
