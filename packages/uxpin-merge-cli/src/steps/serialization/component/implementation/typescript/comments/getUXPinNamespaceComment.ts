import * as ts from 'typescript';
import { getNodeJsDocTags } from './getNodeJsDocTags';

export const UXPIN_NAMESPACE:string = '@uxpinnamespace';

export function getUXpinNamespaceComment(node:ts.Node):ts.JSDocTag | undefined {
  const comments:ts.JSDocTag[] = getNodeJsDocTags(node);

  return comments.find((comment) => comment.getText().trim() === UXPIN_NAMESPACE);
}
