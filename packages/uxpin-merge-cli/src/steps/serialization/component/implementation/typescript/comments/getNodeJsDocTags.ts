import * as ts from 'typescript';

export function getNodeJsDocTags(node: ts.Node): ts.JSDocTag[] {
  return Array.from(ts.getJSDocTags(node));
}
