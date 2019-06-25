import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { getNodeJsDocTags } from './getNodeJsDocTags';

export function getUXpinNamespaceComment(node:ts.Node):ts.JSDocTag | undefined {
  const comments:ts.JSDocTag[] = getNodeJsDocTags(node);

  return comments.find((comment) => comment.getText().trim() === CommentTags.UXPIN_NAMESPACE);
}
