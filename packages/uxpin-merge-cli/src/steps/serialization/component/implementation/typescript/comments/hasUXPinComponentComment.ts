import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { getNodeJsDocTags } from './getNodeJsDocTags';

export function hasUXPinComponentComment(node:ts.Node):boolean {
  const comments:ts.JSDocTag[] = getNodeJsDocTags(node);

  return comments.some((comment) => comment.getText().trim() === CommentTags.UXPIN_COMPONENT);
}
