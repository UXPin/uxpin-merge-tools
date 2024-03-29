import * as ts from 'typescript';
import { getJSDocTagInfoText } from '../../../comments/jsdoc-helpers';
import { JS_DOC_SORT_TAG_NAME } from './shouldSortPropertyValues';

export function getOrderType(jsDocsTags: ts.JSDocTagInfo[]): 'asc' | 'desc' {
  const jsDocTag: ts.JSDocTagInfo | undefined = jsDocsTags.find(
    (tag: ts.JSDocTagInfo) => tag.name === JS_DOC_SORT_TAG_NAME
  );

  if (jsDocTag && getJSDocTagInfoText(jsDocTag) === 'desc') {
    return 'desc';
  }

  return 'asc';
}
