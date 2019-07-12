import { hasCommentTag } from './hasCommentTag';

export function getCommentTagInlineValue(comment:string, tag:string):string | undefined {
  if (!hasCommentTag(comment, tag)) {
    return;
  }

  const pattern:RegExp = new RegExp(`${escapeForRegexp(tag)}\\s+([a-z0-9\\.\\_\\-]+)\\s*$`, 'im');
  const matches:string[] | null = comment.match(pattern);

  if (!matches) {
    return;
  }

  return matches[1];
}

function escapeForRegexp(string:string):string {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}
