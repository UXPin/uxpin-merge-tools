import * as ts from 'typescript';
import { ComponentNamespace } from '../../../ComponentDefinition';
import { getComponentNamespaceImportSlug } from '../../getComponentNamespaceImportSlug';
import { getUXpinNamespaceComment } from '../comments/getUXPinNamespaceComment';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function getComponentNamespace(component:ComponentDeclaration, name:string):ComponentNamespace | undefined {
  const namespace:ts.JSDocTag | undefined = getUXpinNamespaceComment(component);

  if (!namespace || !namespace.comment) {
    return;
  }

  return {
    importSlug: getComponentNamespaceImportSlug(namespace.comment, name),
    name: namespace.comment,
  };
}
