import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { getNodeJsDocTags } from './getNodeJsDocTags';

export function getNodeJsDocTag(node:ts.Node, tag:CommentTags):ts.JSDocTag | undefined {
  const comments:ts.JSDocTag[] = getNodeJsDocTags(node);

  return comments.find((comment) => comment.getText().trim().includes(tag));
}
