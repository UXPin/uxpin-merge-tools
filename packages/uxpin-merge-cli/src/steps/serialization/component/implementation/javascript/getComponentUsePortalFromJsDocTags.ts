import { getCommentTag } from '../../comments/getCommentTag';
import { parseUsePortal } from '../../comments/parseUsePortal';
import { CommentTags } from '../../CommentTags';

/**
 * Extract the value for `@uxpinuseportal` annotation from all JSDoc annotations
 *  can be either undefined (not found), true (found with no value) or a condition such as `props.mode === "inline"`
 */
export function getComponentUsePortalFromJsDocTags(jsDocTags: string[]) {
  const tagName = CommentTags.UXPIN_USE_PORTAL;
  const description = getCommentTag(tagName, jsDocTags);

  if (!description) {
    return;
  }

  const firstLine = description.split('\n')[0];
  const inlineValue: string | undefined = firstLine.slice(tagName.length).trim();

  if (!inlineValue) {
    return true;
  }

  return parseUsePortal(inlineValue);
}
