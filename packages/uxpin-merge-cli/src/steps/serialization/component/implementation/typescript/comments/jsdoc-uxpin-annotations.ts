import * as ts from 'typescript';

import { ComponentNamespace } from '../../../ComponentDefinition';
import { parseUsePortal } from '../../../comments/parseUsePortal';
import { CommentTags } from '../../../CommentTags';
import { ComponentDeclaration } from '../component/getPropsTypeAndDefaultProps';
import { getComponentNamespaceImportSlug } from '../../getComponentNamespaceImportSlug';
import { getJSDocCommentText, getNodeJsDocTag } from './jsdoc-helpers';

export function getComponentDescription(component: ts.Node): string | undefined {
  const jsDocTag: ts.JSDocTag | undefined = getNodeJsDocTag(component, CommentTags.UXPIN_DESCRIPTION);
  if (!jsDocTag) return undefined;
  return getJSDocCommentText(jsDocTag);
}

export function getComponentDocUrl(component: ts.Node): string | undefined {
  const componentDocUrl: ts.JSDocTag | undefined = getNodeJsDocTag(component, CommentTags.UXPIN_DOC_URL);
  if (!componentDocUrl) return undefined;
  return getJSDocCommentText(componentDocUrl);
}

export function getComponentNamespace(component: ComponentDeclaration, name: string): ComponentNamespace | undefined {
  const namespace: ts.JSDocTag | undefined = getNodeJsDocTag(component, CommentTags.UXPIN_NAMESPACE);
  if (!namespace || !namespace.comment) {
    return;
  }
  const text = getJSDocCommentText(namespace) as string;
  return {
    importSlug: getComponentNamespaceImportSlug(text, name),
    name: text,
  };
}

export function getComponentUsePortal(declaration: ComponentDeclaration) {
  const node = getNodeJsDocTag(declaration, CommentTags.UXPIN_USE_PORTAL);
  if (!node) return undefined;
  if (node.comment) return parseUsePortal(node.comment as string);
  return Boolean(node);
}

export function hasUXPinComponentComment(node: ts.Node): boolean {
  return getNodeJsDocTag(node, CommentTags.UXPIN_COMPONENT) !== undefined;
}
