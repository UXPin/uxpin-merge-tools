import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { getNodeJsDocTag } from './jsdoc-helpers';

export function getComponentDocUrl(component: ts.Node): string | undefined {
  const componentDocUrl: ts.JSDocTag | undefined = getUXpinDocUrlComment(component);

  return componentDocUrl?.comment as string;
}

export function getUXpinDocUrlComment(node: ts.Node): ts.JSDocTag | undefined {
  return getNodeJsDocTag(node, CommentTags.UXPIN_DOC_URL);
}
