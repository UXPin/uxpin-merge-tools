import { CommentTags } from '../../../CommentTags';
import { ComponentDeclaration } from '../component/getPropsTypeAndDefaultProps';
import { getNodeJsDocTag } from './jsdoc-helpers';

export function getComponentUsePortal(declaration: ComponentDeclaration) {
  const node = getNodeJsDocTag(declaration, CommentTags.UXPIN_USE_PORTAL);
  return Boolean(node);
}
