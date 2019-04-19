import * as ts from 'typescript';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isDefaultExported } from './isDefaultExported';

export function findDefaultExportedClass(sourceFile:ts.SourceFile):ClassComponentDeclaration | undefined {
  let result:ts.ClassDeclaration | ts.ClassExpression | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if ((ts.isClassDeclaration(node) || ts.isClassExpression(node)) && isDefaultExported(node)) {
      result = node;
    }
  });
  return result;
}
