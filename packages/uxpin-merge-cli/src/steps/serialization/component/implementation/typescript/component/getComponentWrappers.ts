import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { ComponentWrapper } from '../../../wrappers/ComponentWrapper';
import { parseWrapperAnnotation } from '../../../wrappers/parseWrapperAnnotation';
import { getNodeJsDocTag } from '../comments/getNodeJsDocTag';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function getComponentWrappers(component:ComponentDeclaration):ComponentWrapper[] | undefined {
  const wrappersTag:ts.JSDocTag | undefined = getNodeJsDocTag(component, CommentTags.UXPIN_WRAPPERS);
  if (!wrappersTag) {
    return undefined;
  }

  return parseWrapperAnnotation(`@${wrappersTag.tagName.escapedText} ${wrappersTag.comment}`);
}
