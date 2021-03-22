import * as ts from 'typescript';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getNodeName } from '../node/getNodeName';
import { ClassComponentDeclaration } from './getPropsTypeAndDefaultProps';
import { isExported } from './isExported';

export function findExportedClassWithName(
  context:TSSerializationContext,
  className:string,
):ClassComponentDeclaration | undefined {
  let result:ts.ClassDeclaration | ts.ClassExpression | undefined;
  ts.forEachChild(context.file, (node) => {
    if (ts.isClassDeclaration(node) && isExported(node) && getNodeName(node) === className) {
      result = node;
    }
  });
  return result;
}
