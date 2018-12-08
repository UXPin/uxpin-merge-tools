import * as ts from 'typescript';
import { isDefaultExported } from './isDefaultExported';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function findDefaultExportedClass(sourceFile:ts.SourceFile):ClassComponentDeclaration | undefined {
  let result:ts.ClassDeclaration | ts.ClassExpression | undefined;
  ts.forEachChild(sourceFile, (node) => {
    if ((ts.isClassDeclaration(node) || ts.isClassExpression(node)) && isDefaultExported(node)) {
      result = node;
    }
  });
  return result;
}
