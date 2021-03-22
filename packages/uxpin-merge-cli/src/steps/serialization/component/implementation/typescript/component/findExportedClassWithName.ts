import * as ts from 'typescript';
import { getNodeName } from '../node/getNodeName';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isExported } from './isExported';
import { isNodeExported } from './isNodeExported';

export function getClassComponentDeclaration(
  sourceFile:ts.SourceFile,
  className:string,
):ClassComponentDeclaration | undefined {
  let result:ts.ClassDeclaration | ts.ClassExpression | undefined;

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isClassDeclaration(node) && getNodeName(node) === className) {
      result = node;
    }
  });

  return result;
}

export function findExportedClassWithName(
  sourceFile:ts.SourceFile,
  className:string,
):ClassComponentDeclaration | undefined {
  const result:ts.ClassDeclaration | ts.ClassExpression | undefined = getClassComponentDeclaration(
    sourceFile,
    className,
  );

  if (result && isExported(result)) {
    return result;
  }

  let isClassExported:boolean = false;

  ts.forEachChild(sourceFile, (node) => {
    if (!isClassExported) {
      isClassExported = isNodeExported(node, className);
    }
  });

  return isClassExported ? result : undefined;
}
