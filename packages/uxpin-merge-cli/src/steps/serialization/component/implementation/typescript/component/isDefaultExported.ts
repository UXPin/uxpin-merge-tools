import * as ts from 'typescript';
import { hasUXPinComponentComment } from '../comments/hasUXPinComponentComment';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { isDefaultExportedForwardRef } from './findExportedFunctionWithReactForwardRef';
import { getComponentName } from './getComponentName';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isExported } from './isExported';

export function isDefaultExported(declaration:ComponentDeclaration, context:TSSerializationContext):boolean {
  const componentName:string = getComponentName(context, declaration);

  // e.g. export default () => {};
  if (ts.isArrowFunction(declaration) && ts.isExportAssignment(declaration.parent)) {
    return true;
  }

  // e.g. export default Class Component
  // e.g. export default function Component()
  // NOTE: This returns `false` for cases like below. So, it is too early to tell
  // if this file export Component as default or not.
  // And it will be checked with `isWrappedWithHOC` at later steps
  // ------------------- Case #1
  // /**
  //  * @uxpincomponent
  //  */
  // export class Button
  // export default withHOC(Component)
  // ------------------- Case #2
  // export function FunctionMatchWithFileName()| export class ClassMatchWithFileName
  // export default withHOC(FunctionMatchWithFileName|ClassMatchWithFileName)
  if (!hasUXPinComponentComment(declaration) && hasDefaultKeywordInModifiers(declaration)) {
    return true;
  }

  // export default Component;
  // Because export statement is in different node, we need to go through again...
  let isDefault:boolean = false;
  ts.forEachChild(context.file, (node) => {

    // export { Component as default }
    if (ts.isExportDeclaration(node) && node.exportClause && ts.isNamedExports(node.exportClause)) {
      isDefault = node.exportClause.elements.some((specifier:ts.ExportSpecifier) => {
        return (
          specifier.propertyName &&
          specifier.propertyName.escapedText === componentName &&
          specifier.name.escapedText === 'default'
        );
      });
    }

    // isExportAssignment returns true when the code looks like
    // "export default Component;"
    // "export { component }" is not a ExportAssigment, it's a ExportDeclaration.
    // so named export component doesn't pass below if condition.
    // It means there is a default export statement if there is ANY ExportAssigment node exists in the file,
    if (!ts.isExportAssignment(node)) { return; }
    isDefault = true;
    return;
  });
  return isDefault;
}

function isDefaultExportedFunctionWithAnyName(exportedName:string, declaration:ComponentDeclaration):boolean {
  console.log('DECLARATION', declaration)
  console.log('ts.isFunctionDeclaration(DECLARATION)', ts.isFunctionDeclaration(declaration))
  console.log('ts.isClassDeclaration(DECLARATION)', ts.isClassDeclaration(declaration))
  console.log('ts.isFunction(DECLARATION)', ts.isArrowFunction(declaration))
  console.log('EXPORTEDNAME', exportedName)
  console.log('GETNODENAME', getNodeName(declaration))
  return ((ts.isFunctionDeclaration(declaration) || ts.isArrowFunction(declaration) || ts.isClassDeclaration(declaration)) && exportedName !== undefined);
}

function isDefaultExportedArrowFunctionWithName(
    exportedName:string,
    componentName:string,
    declaration:ComponentDeclaration):boolean {

  return ts.isArrowFunction(declaration) && exportedName === componentName;
}

function isDefaultExportedFunctionWithName(exportedName:string, declaration:ComponentDeclaration):boolean {
  return ts.isFunctionDeclaration(declaration) && exportedName === getNodeName(declaration);
}

function isDefaultExportedClassWithName(exportedName:string, declaration:ComponentDeclaration):boolean {
  return ts.isClassDeclaration(declaration) && exportedName === getNodeName(declaration);
}

function isWrappedWithHOC(exportedName:string, expression?:ts.Expression):boolean {
  if (!expression) {
    return false;
  }

  // @ts-ignore
  return expression.arguments && expression.arguments.some((node) => {
    if (node.escapedText === exportedName) {
      return true;
    }
    return isWrappedWithHOC(exportedName, node.expression);
  });
}

function hasDefaultKeywordInModifiers(declaration:ComponentDeclaration):boolean {
  return (
    !!declaration.modifiers &&
    isExported(declaration) &&
    declaration.modifiers.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)
  );
}
