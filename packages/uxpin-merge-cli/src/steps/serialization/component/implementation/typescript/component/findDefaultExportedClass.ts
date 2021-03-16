import * as ts from 'typescript';
import { isDefaultExported } from '../../isDefaultExported';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getComponentName } from './getComponentName';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isExported } from './isExported';
import { withDefaultExportKeyword } from './withDefaultExportKeyword';

export function findDefaultExportedClass(context:TSSerializationContext):ClassComponentDeclaration | undefined {
  let result:ts.ClassDeclaration | ts.ClassExpression | undefined;
  // e.g. export default class Component
  ts.forEachChild(context.file, (node) => {
    if (isDefaultExportedClass(context, node)) {
      result = node as ClassComponentDeclaration;
    }
  });
  return result;
}

function isDefaultExportedClass(context:TSSerializationContext, node:any):boolean {
  return (
    (ts.isClassDeclaration(node) || ts.isClassExpression(node)) &&
    isExported(node) &&
    withDefaultExportKeyword(node)
  );
}
