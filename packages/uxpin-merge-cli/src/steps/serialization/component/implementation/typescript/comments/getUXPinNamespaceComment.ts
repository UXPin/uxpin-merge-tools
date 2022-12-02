import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { getNodeJsDocTag } from './jsdoc-helpers';

export function getUXpinNamespaceComment(node: ts.Node): ts.JSDocTag | undefined {
  return getNodeJsDocTag(node, CommentTags.UXPIN_NAMESPACE);
}
