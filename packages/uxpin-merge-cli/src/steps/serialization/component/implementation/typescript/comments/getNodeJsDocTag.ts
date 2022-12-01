import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { getNodeJsDocTags } from './getNodeJsDocTags';

export function getNodeJsDocTag(node: ts.Node, tag: CommentTags): ts.JSDocTag | undefined {
  const nodeWithJsDoc = getNodeWithJsDoc(node);
  const comments: ts.JSDocTag[] = getNodeJsDocTags(nodeWithJsDoc);

  return comments.find((comment) => comment.getText().trim().includes(tag));
}

function getNodeWithJsDoc(node: ts.Node) {
  if (node.parent.kind === ts.SyntaxKind.CallExpression) {
    return node.parent;
  }
  return node;
}
