import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isExported } from './isExported';
import { isNodeExported } from './isNodeExported';

export function getClassComponentDeclaration(
  context: TSSerializationContext,
  className: string
): ClassComponentDeclaration | undefined {
  let result: ts.ClassDeclaration | ts.ClassExpression | undefined;

  ts.forEachChild(context.file, (node) => {
    if (ts.isClassDeclaration(node) && getNodeName(node) === className) {
      result = node;
    }
  });

  return result;
}

export function findExportedClassWithName(
  context: TSSerializationContext,
  className: string
): ClassComponentDeclaration | undefined {
  const result: ts.ClassDeclaration | ts.ClassExpression | undefined = getClassComponentDeclaration(context, className);

  if (result && isExported(result)) {
    return result;
  }

  let isClassExported = false;

  ts.forEachChild(context.file, (node) => {
    if (!isClassExported) {
      isClassExported = isNodeExported(node, className);
    }
  });

  return isClassExported ? result : undefined;
}
