import { CommentTags } from '../../../CommentTags';
import { getCommentTag } from '../../../comments/getCommentTag';

export function extractSingleWordFromJsDocTags(tagName: CommentTags, jsDocTags: string[]): string | undefined {
  const foundLineWithTag = getCommentTag(tagName, jsDocTags) || '';
  return getCommentTagSingleWord(foundLineWithTag, tagName);
}

export function getCommentTagSingleWord(comment: string, tag: string): string | undefined {
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

export function extractMultipleWordFromJsDocTags(tagName: CommentTags, jsDocTags: string[]): string | undefined {
  const description = getCommentTag(tagName, jsDocTags);
  if (!description) {
    return;
  }
  const firstLine = description.split('\n')[0];
  const inlineValue: string | undefined = firstLine.slice(tagName.length).trim();
  return inlineValue;
}

function escapeForRegexp(string: string): string {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
