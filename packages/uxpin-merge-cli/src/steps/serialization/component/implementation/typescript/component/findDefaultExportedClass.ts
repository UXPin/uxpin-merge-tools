import * as ts from 'typescript';
import { isDefaultExported } from '../../isDefaultExported';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getComponentName } from './getComponentName';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function findDefaultExportedClass(context:TSSerializationContext):ClassComponentDeclaration | undefined {
  let result:ts.ClassDeclaration | ts.ClassExpression | undefined;
  ts.forEachChild(context.file, (node) => {
    if (isDefaultExportedClass(context, node)) {
      result = node as ClassComponentDeclaration;
    }
  });
  return result;
}

function isDefaultExportedClass(context:TSSerializationContext, node:any):boolean {
  return (
    ts.isClassDeclaration(node) || ts.isClassExpression(node)) &&
    isDefaultExported(context.componentPath, getComponentName(context, node)
  );
}
