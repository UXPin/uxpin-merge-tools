import { CommentTags } from '../../CommentTags';
import { getCommentTag } from '../../comments/getCommentTag';
import { parseUsePortal } from '../../comments/parseUsePortal';
import { ComponentNamespace } from './../../ComponentDefinition';
import { getComponentNamespaceImportSlug } from '../getComponentNamespaceImportSlug';

export function getComponentDocUrlFromDescription(description: string): string | undefined {
  if (!description) {
    return;
  }
  const componentDocUrl: string | undefined = getCommentTagInlineValue(description, CommentTags.UXPIN_DOC_URL);
  if (!componentDocUrl) {
    return;
  }
  return componentDocUrl;
}

export function getComponentNamespaceFromDescription(
  componentName: string,
  description: string
): ComponentNamespace | undefined {
  if (!description) {
    return;
  }
  const namespaceName: string | undefined = getCommentTagInlineValue(description, CommentTags.UXPIN_NAMESPACE);
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

  const firstLine = description.split('\n')[0];
  const inlineValue: string | undefined = firstLine.slice(tagName.length).trim();

  if (!inlineValue) {
    return true;
  }

  return parseUsePortal(inlineValue);
}

export function getCommentTagInlineValue(comment: string, tag: string): string | undefined {
  if (!hasCommentTag(comment, tag)) {
    return;
  }
  const pattern = new RegExp(`${escapeForRegexp(tag)}\\s+([a-z0-9\\.\\_\\-\\:\\/\\#]+)\\s*$`, 'im');
  const matches: string[] | null = comment.match(pattern);
  if (!matches) {
    return;
  }
  return matches[1];
}

export function hasCommentTag(comment: string, tag: string): boolean {
  return comment.includes(tag);
}

function escapeForRegexp(string: string): string {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
