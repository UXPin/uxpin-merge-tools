import * as ts from 'typescript';
import { hasUXPinComponentComment } from '../comments/jsdoc-uxpin-annotations';
import { TSSerializationContext } from '../context/getSerializationContext';
import {
  ClassComponentDeclaration,
  ComponentDeclaration,
  FunctionalComponentDeclaration,
} from './getPropsTypeAndDefaultProps';
import { isClassComponentDeclaration } from './isClassComponentDeclaration';
import { isFunctionalComponentDeclaration } from './isFunctionalComponentDeclaration';

export const findSpecifiedClassComponent: (context: TSSerializationContext) => ClassComponentDeclaration | undefined =
  createFindSpecifiedComponent(isClassComponentDeclaration);

export const findSpecifiedFunctionComponent: (
  context: TSSerializationContext
) => FunctionalComponentDeclaration | undefined = createFindSpecifiedComponent(isFunctionalComponentDeclaration);

function createFindSpecifiedComponent<T extends ComponentDeclaration>(
  declarationChecker: (node: ts.Node) => node is T
): (context: TSSerializationContext) => T | undefined {
  return (context: TSSerializationContext) => {
    let result: T | undefined;

    ts.forEachChild(context.file, (node) => {
      if (!result && declarationChecker(node) && hasUXPinComponentComment(node)) {
        result = node;
      }
    });

    return result;
  };
}
