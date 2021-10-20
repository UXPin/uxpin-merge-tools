import { CommentTags } from '../../CommentTags';
import { getCommentTagInlineValue } from './getCommentTagInlineValue';

export function getComponentDocUrlFromDescription(description:string):string | undefined {
  if (!description) {
    return;
  }

  const componentDocUrl:string | undefined = getCommentTagInlineValue(description, CommentTags.UXPIN_DOC_URL);

  if (!componentDocUrl) {
    return;
  }

  return componentDocUrl;
}
