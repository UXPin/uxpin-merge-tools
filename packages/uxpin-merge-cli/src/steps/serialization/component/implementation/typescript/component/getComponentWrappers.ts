import * as ts from 'typescript';
import { CommentTags } from '../../../CommentTags';
import { ComponentWrapper } from '../../../wrappers/ComponentWrapper';
import { parseWrapperAnnotation } from '../../../wrappers/parseWrapperAnnotation';
import { getNodeJsDocTag } from '../comments/jsdoc-helpers';
import { ComponentDeclaration } from './getPropsTypeAndDefaultProps';

export function getComponentWrappers(component: ComponentDeclaration): ComponentWrapper[] {
  const wrappersTag: ts.JSDocTag | undefined = getNodeJsDocTag(component, CommentTags.UXPIN_WRAPPERS);
  if (!wrappersTag) {
    return [];
  }

  return parseWrapperAnnotation(`@${wrappersTag.tagName.escapedText} ${wrappersTag.comment}`);
}
