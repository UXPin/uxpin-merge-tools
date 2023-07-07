import { CommentTags } from '../CommentTags';

export function getCommentTag(tag: CommentTags, tags: string[]): string | undefined {
  return tags.find((line: string) => line.startsWith(tag));
}
