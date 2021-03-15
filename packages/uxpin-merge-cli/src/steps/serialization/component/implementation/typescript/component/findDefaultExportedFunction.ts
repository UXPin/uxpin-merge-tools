import * as ts from 'typescript';
import { isDefaultExported } from '../../isDefaultExported';
import { TSSerializationContext } from '../context/getSerializationContext';
import { getComponentName } from './getComponentName';

export function findDefaultExportedFunction(context:TSSerializationContext):ts.FunctionDeclaration | undefined {
  let result:ts.FunctionDeclaration | undefined;
  ts.forEachChild(context.file, (node) => {
    if (ts.isFunctionDeclaration(node) && isDefaultExported(context.componentPath, getComponentName(context, node))) {
      result = node;
    }
  });
  return result;
}
