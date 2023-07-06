import { CommentTags } from '../CommentTags';

export function getCommentTag(tag: CommentTags, tags: string[]): string | undefined {
  return tags.find((line: string) => line.startsWith(tag));
}

/**
 * Extract from the JSDoc the value related to a given tag, considering only the first line.
 * Added for `@uxpinuseportal` that expects an expression such as `props.mode === "inline"`
 */
export function getCommentTagRawValue(tag: CommentTags, tags: string[]) {
  const description = getCommentTag(tag, tags);

  if (!description) {
    return;
  }

  const firstLine = description.split('\n')[0];
  const inlineValue: string | undefined = firstLine.slice(tag.length).trim();

  if (!inlineValue) {
    return true;
  }

  return inlineValue;
}
