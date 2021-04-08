import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { isExported } from './isExported';
import { isFunctionalComponentWithReactForwardRef } from './isFunctionalComponentWithReactForwardRef';
import { isNodeExported } from './isNodeExported';

interface ComponentFunction {
  fn:ts.ArrowFunction | ts.FunctionExpression | undefined;
  isExported:boolean;
}

function isVariableStatementWithProperName(node:ts.Node, functionName:string):node is ts.VariableStatement {
  return ts.isVariableStatement(node)
    && getNodeName(node.declarationList.declarations[0].initializer?.parent) === functionName;
}

function isExportedForwardRef(node:ts.Node):node is ts.ExportAssignment {
  return ts.isExportAssignment(node)
    && ts.isCallExpression(node.expression)
   && isFunctionalComponentWithReactForwardRef(node);
}

function getVariableStatement(sourceFile:ts.SourceFile, functionName:string):ts.VariableStatement | undefined {
  let result:ts.VariableStatement | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (!result && isVariableStatementWithProperName(node, functionName)) {
      result = node;
    }
  });

  return result;
}

function getFunctionDeclaration(
  sourceFile:ts.SourceFile,
  functionName:string,
):ComponentFunction|undefined {
  const variable:ts.VariableStatement | undefined = getVariableStatement(sourceFile, functionName);

  // const Component = forwardRef(() => {});
  // const Component = forwardRef(function() {});
  if (variable && isFunctionalComponentWithReactForwardRef(variable)) {
    const argument:ts.Expression = (
      variable.declarationList.declarations[0].initializer as ts.CallExpression
    ).arguments[0];

    if (ts.isArrowFunction(argument) || ts.isFunctionExpression(argument)) {
      return { fn: argument, isExported: isExported(variable) };
    }
  }

  // export default forwardRef(function() {});
  // export default forwardRef(() => {});
  let result:ts.ArrowFunction | ts.FunctionExpression | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (isExportedForwardRef(node)) {
      const argument:ts.Expression = (node.expression as ts.CallExpression).arguments[0];

      if (ts.isArrowFunction(argument) || ts.isFunctionExpression(argument)) {
        result = argument;
      }
    }
  });

  return { fn: result, isExported: true };
}

export function findExportedFunctionWithReactForwardRef(
  context:TSSerializationContext,
  functionName:string,
):ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression | undefined {
  const result:ComponentFunction | undefined = getFunctionDeclaration(
    context.file,
    functionName,
  );

  if (result && result.isExported) {
    return result.fn;
  }

  let isFunctionExported:boolean = false;

  // non-inline export
  // const Component = forwardRef(() => {});
  // export Component;
  ts.forEachChild(context.file, (node) => {
    if (!isFunctionExported) {
      isFunctionExported = isNodeExported(node, functionName);
    }
  });

  return isFunctionExported ? result?.fn : undefined;
}
