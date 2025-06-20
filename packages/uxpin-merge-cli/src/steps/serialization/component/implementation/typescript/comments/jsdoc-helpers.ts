import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';

export function getNodeJsDocAllTags(node: ts.Node): ts.JSDocTag[] {
  return Array.from(ts.getJSDocTags(node));
}

export function getNodeJsDocTag(node: ts.Node, tag: CommentTags): ts.JSDocTag | undefined {
  const nodeWithJsDoc = getNodeWithJsDoc(node);
  const comments: ts.JSDocTag[] = getNodeJsDocAllTags(nodeWithJsDoc);

  return comments.find((comment) => comment.getText().trim().includes(tag));
}

// When the component is wrapped inside a `React.forwardRef()` call,
// we need to lookup through the parent Nodes to access the JSDoc comments.
// In typescript 5, the immediate node parent does not always contain the JSDoc's,
// so we are going up the tree until we find a variable statement.
function getNodeWithJsDoc(node: ts.Node) {
  let parent = node.parent;
  while (parent) {
    if (ts.isVariableStatement(parent)) {
      return parent;
    }

    parent = parent.parent;
  }

  return node;
}

export function getJSDocCommentText(tag: ts.JSDocTag): string | undefined {
  if (typeof tag?.comment === 'string') return tag?.comment;
  return tag?.comment?.[0]?.text;
}

export function getJSDocTagInfoText(tagInfo: ts.JSDocTagInfo): string | undefined {
  return tagInfo.text?.[0]?.text;
}
