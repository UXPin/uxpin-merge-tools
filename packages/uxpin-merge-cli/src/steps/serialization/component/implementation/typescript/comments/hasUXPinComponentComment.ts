import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { getNodeJsDocTag } from './getNodeJsDocTag';

export function hasUXPinComponentComment(node: ts.Node): boolean {
  return getNodeJsDocTag(node, CommentTags.UXPIN_COMPONENT) !== undefined;
}
