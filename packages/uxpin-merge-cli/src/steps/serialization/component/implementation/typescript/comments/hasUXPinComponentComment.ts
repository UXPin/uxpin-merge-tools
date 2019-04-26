import * as ts from 'typescript';
import { getNodeJsDocTags } from './getNodeJsDocTags';

const UXPIN_COMPONENT:string = '@uxpincomponent';

export function hasUXPinComponentComment(node:ts.Node):boolean {
  const comments:ts.JSDocTag[] = getNodeJsDocTags(node);

  return comments.some((comment) => comment.getText() === UXPIN_COMPONENT);
}
