import * as ts from 'typescript';

export function getNodeJsDocAllTags(node: ts.Node): ts.JSDocTag[] {
  return Array.from(ts.getJSDocTags(node));
}

export function getNodeJsDocTag(node: ts.Node, tag: CommentTags): ts.JSDocTag | undefined {
  const nodeWithJsDoc = getNodeWithJsDoc(node);
  const comments: ts.JSDocTag[] = getNodeJsDocAllTags(nodeWithJsDoc);

  return comments.find((comment) => comment.getText().trim().includes(tag));
}

// When the component is wrapped inside a `React.forwardRef()` call,
// we need to lookup the parent Node to access the JSDoc comments
function getNodeWithJsDoc(node: ts.Node) {
  if (node.parent.kind === ts.SyntaxKind.CallExpression) {
    return node.parent;
  }
  return node;
}
