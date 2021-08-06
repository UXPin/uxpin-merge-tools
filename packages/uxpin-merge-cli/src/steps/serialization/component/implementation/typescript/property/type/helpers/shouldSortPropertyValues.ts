import * as ts from 'typescript';

export const JS_DOC_SORT_TAG_NAME:'uxpinsort' = 'uxpinsort';

export function shouldSortPropertyValues(jsDocsTags:ts.JSDocTagInfo[]):boolean {
	return !!jsDocsTags.find(
		(tag:ts.JSDocTagInfo) => tag.name === JS_DOC_SORT_TAG_NAME,
	);
}
