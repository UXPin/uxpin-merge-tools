import * as ts from 'typescript';
import { getNodeName } from '../node/getNodeName';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isExported } from './isExported';

export function findExportedClassWithName(
  sourceFile:ts.SourceFile,
  className:string,
):ClassComponentDeclaration | undefined {
  let result:ts.ClassDeclaration | ts.ClassExpression | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isClassDeclaration(node) && isExported(node) && getNodeName(node) === className) {
      result = node;
    }
  });
  return result;
}
