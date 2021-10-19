import { CommentTags } from '../../CommentTags';
import { ComponentDocUrl } from './../../ComponentDefinition';
import { getCommentTagInlineValue } from './getCommentTagInlineValue';

export function getComponentDocUrlFromDescription(description:string):ComponentDocUrl | undefined {
  if (!description) {
    return;
  }

  const componentDocUrl:string | undefined = getCommentTagInlineValue(description, CommentTags.UXPIN_DOC_URL);

  if (!componentDocUrl) {
    return;
  }

  return {
    url: componentDocUrl,
  }
}


