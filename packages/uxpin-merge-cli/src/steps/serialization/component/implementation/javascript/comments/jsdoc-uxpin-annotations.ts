import { CommentTags } from '../../../CommentTags';
import { getCommentTag } from '../../../comments/getCommentTag';
import { parseUsePortal } from '../../../comments/parseUsePortal';
import { ComponentNamespace } from '../../../ComponentDefinition';
import { getComponentNamespaceImportSlug } from '../../getComponentNamespaceImportSlug';
import { extractMultipleWordsFromJsDocTags, extractSingleWordFromJsDocTags } from './jsdoc-helpers';

export function getComponentDocUrlFromJsDocTags(jsDocTags: string[]) {
  return extractSingleWordFromJsDocTags(CommentTags.UXPIN_DOC_URL, jsDocTags);
}

export function getComponentNamespaceFromJsDocTags(
  componentName: string,
  jsDocTags: string[]
): ComponentNamespace | undefined {
  const namespaceName = extractSingleWordFromJsDocTags(CommentTags.UXPIN_NAMESPACE, jsDocTags);
  if (!namespaceName) {
    return;
  }
  return {
    importSlug: getComponentNamespaceImportSlug(namespaceName, componentName),
    name: namespaceName,
  };
}

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
  const inlineValue = extractMultipleWordsFromJsDocTags(tagName, jsDocTags);
  if (!inlineValue) {
    return true;
  }
  return parseUsePortal(inlineValue);
}
