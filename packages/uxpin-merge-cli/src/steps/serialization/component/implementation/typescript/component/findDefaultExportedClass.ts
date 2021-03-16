import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isDefaultExported } from './isDefaultExported';

export function findDefaultExportedClass(context:TSSerializationContext):ClassComponentDeclaration | undefined {
  let result:ts.ClassDeclaration | ts.ClassExpression | undefined;
  // e.g. export default class Component
  ts.forEachChild(context.file, (node) => {
    if ((ts.isClassDeclaration(node) || ts.isClassExpression(node)) && isDefaultExported(node, context)) {
      result = node;
    }
  });
  return result;
}
