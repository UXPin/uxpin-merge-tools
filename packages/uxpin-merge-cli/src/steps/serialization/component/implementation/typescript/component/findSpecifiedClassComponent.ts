import * as ts from 'typescript';
import { hasUXPinComponentComment } from '../comments/hasUXPinComponentComment';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isClassComponentDeclaration } from './isClassComponentDeclaration';

export function findSpecifiedClassComponent(sourceFile:ts.SourceFile):ClassComponentDeclaration | undefined {
  let result:ClassComponentDeclaration | undefined;

  ts.forEachChild(sourceFile, (node) => {
    if (!result && isClassComponentDeclaration(node) && hasUXPinComponentComment(node)) {
      result = node;
    }
  });

  return result;
}
