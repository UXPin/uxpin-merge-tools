import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { getNodeJsDocTag } from './getNodeJsDocTag';

export function getUXpinDocUrlComment(node:ts.Node):ts.JSDocTag | undefined {
    return getNodeJsDocTag(node, CommentTags.UXPIN_DOC_URL);
  }