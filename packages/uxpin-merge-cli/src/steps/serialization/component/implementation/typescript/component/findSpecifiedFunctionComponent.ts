import * as ts from 'typescript';
import { hasUXPinComponentComment } from '../comments/hasUXPinComponentComment';
import { FunctionalComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isFunctionalComponentDeclaration } from './isFunctionalComponentDeclaration';

export function findSpecifiedFunctionComponent(sourceFile:ts.SourceFile):FunctionalComponentDeclaration | undefined {
  let result:FunctionalComponentDeclaration | undefined;

  ts.forEachChild(sourceFile, (node) => {
    if (!result && isFunctionalComponentDeclaration(node) && hasUXPinComponentComment(node)) {
      result = node;
    }
  });

  return result;
}
