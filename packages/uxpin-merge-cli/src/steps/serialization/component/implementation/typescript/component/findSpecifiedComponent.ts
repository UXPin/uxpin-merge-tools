import * as ts from 'typescript';
import { hasUXPinComponentComment } from '../comments/hasUXPinComponentComment';
import {
  ClassComponentDeclaration,
  ComponentDeclaration,
  FunctionalComponentDeclaration,
} from './getPropsTypeAndDefaultProps';
import { isClassComponentDeclaration } from './isClassComponentDeclaration';
import { isFunctionalComponentDeclaration } from './isFunctionalComponentDeclaration';

export const findSpecifiedClassComponent:(sourceFile:ts.SourceFile) => ClassComponentDeclaration | undefined =
  createFindSpecifiedComponent(isClassComponentDeclaration);

export const findSpecifiedFunctionComponent:(sourceFile:ts.SourceFile) => FunctionalComponentDeclaration | undefined =
  createFindSpecifiedComponent(isFunctionalComponentDeclaration);

function createFindSpecifiedComponent<T extends ComponentDeclaration>(
  declarationChecker:(node:ts.Node) => node is T,
):(sourceFile:ts.SourceFile) => T | undefined {
  return (sourceFile:ts.SourceFile) => {
    let result:T | undefined;

    ts.forEachChild(sourceFile, (node) => {
      if (!result && declarationChecker(node) && hasUXPinComponentComment(node)) {
        result = node;
      }
    });

    return result;
  };
}
