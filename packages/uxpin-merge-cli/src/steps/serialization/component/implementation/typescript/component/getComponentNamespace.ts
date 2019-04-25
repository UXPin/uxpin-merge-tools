import * as ts from 'typescript';
import { ComponentNamespace } from '../../../ComponentDefinition';
import { getUXpinNamespaceComment } from '../comments/getUXPinNamespaceComment';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export const NAMESPACE_NAME_DELIMITER:string = '.';
export const NAMESPACE_IMPORT_SLUG_DELIMITER:string = '_';

export function getComponentNamespace(component:ComponentDeclaration, name:string):ComponentNamespace | undefined {
  const namespace:ts.JSDocTag | undefined = getUXpinNamespaceComment(component);

  if (!namespace || !namespace.comment) {
    return;
  }

  return {
    importSlug: getImportSlug(namespace.comment, name),
    name: namespace.comment,
  };
}

function getImportSlug(namespaceName:string, componentName:string):string {
  return [
    ...namespaceName.split(NAMESPACE_NAME_DELIMITER),
    componentName,
  ].join(NAMESPACE_IMPORT_SLUG_DELIMITER);
}
