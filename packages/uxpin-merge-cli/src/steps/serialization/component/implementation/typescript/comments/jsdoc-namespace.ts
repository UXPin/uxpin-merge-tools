import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { ComponentNamespace } from '../../../ComponentDefinition';
import { getComponentNamespaceImportSlug } from '../../getComponentNamespaceImportSlug';
import { ComponentDeclaration } from '../component/getPropsTypeAndDefaultProps';
import { getJSDocCommentText, getNodeJsDocTag } from './jsdoc-helpers';

export function getComponentNamespace(component: ComponentDeclaration, name: string): ComponentNamespace | undefined {
  const namespace: ts.JSDocTag | undefined = getUXpinNamespaceComment(component);

  if (!namespace || !namespace.comment) {
    return;
  }

  const text = getJSDocCommentText(namespace);

  return {
    importSlug: getComponentNamespaceImportSlug(text!, name),
    name: text!,
  };
}

export function getUXpinNamespaceComment(node: ts.Node): ts.JSDocTag | undefined {
  return getNodeJsDocTag(node, CommentTags.UXPIN_NAMESPACE);
}
