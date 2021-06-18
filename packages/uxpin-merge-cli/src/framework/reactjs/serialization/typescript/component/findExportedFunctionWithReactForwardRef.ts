import * as ts from 'typescript';
import { getVariableStatement } from '../../../../../steps/serialization/component/implementation/typescript/component/getVariableStatement';
import { isExported } from '../../../../../steps/serialization/component/implementation/typescript/component/isExported';
import { isNodeExported } from '../../../../../steps/serialization/component/implementation/typescript/component/isNodeExported';
import { TSSerializationContext } from '../../../../../steps/serialization/component/implementation/typescript/context/getSerializationContext';
import { isFunctionalComponentWithReactForwardRef } from './isFunctionalComponentWithReactForwardRef';

interface ComponentData {
  declaration:ts.ArrowFunction | ts.FunctionExpression | ts.VariableDeclaration | undefined;
  isExported:boolean;
}

export function isDefaultExportedForwardRef(node:ts.Node):node is ts.ExportAssignment {
  return ts.isExportAssignment(node)
    && ts.isCallExpression(node.expression)
   && isFunctionalComponentWithReactForwardRef(node);
}

function getComponentDeclaration(
  sourceFile:ts.SourceFile,
  functionName:string,
):ComponentData|undefined {
  const variable:ts.VariableStatement | undefined = getVariableStatement(sourceFile, functionName);

  // const Component = forwardRef(() => {});
  // const Component = forwardRef(function() {});
  // const Component = forwardRef(_Component);
  if (variable && isFunctionalComponentWithReactForwardRef(variable)) {
    const argument:ts.Expression = (
      variable.declarationList.declarations[0].initializer as ts.CallExpression
    ).arguments[0];

    // const Component = forwardRef(_Component);
    if (ts.isIdentifier(argument)) {
      const internalVariable:ts.VariableStatement | undefined  = getVariableStatement(
        sourceFile,
        (argument as ts.Identifier).escapedText as string,
      );
      const initializer:any = internalVariable?.declarationList?.declarations[0]?.initializer;

      if (initializer && ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) {
        return { declaration: variable.declarationList.declarations[0], isExported: isExported(variable) };
      }
    }

    if (ts.isArrowFunction(argument) || ts.isFunctionExpression(argument)) {
      return { declaration: argument, isExported: isExported(variable) };
    }
  }

  // export default forwardRef(function() {});
  // export default forwardRef(() => {});
  let result:ts.ArrowFunction | ts.FunctionExpression | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (isDefaultExportedForwardRef(node)) {
      const argument:ts.Expression = (node.expression as ts.CallExpression).arguments[0];

      if (ts.isArrowFunction(argument) || ts.isFunctionExpression(argument)) {
        result = argument;
      }
    }
  });

  return { declaration: result, isExported: true };
}

export function findExportedFunctionWithReactForwardRef(
  context:TSSerializationContext,
  functionName:string,
):ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression | ts.VariableDeclaration | undefined {
  const result:ComponentData | undefined = getComponentDeclaration(
    context.file,
    functionName,
  );

  if (result && result.isExported) {
    return result.declaration;
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

  return isFunctionExported ? result?.declaration : undefined;
}
