import { CommentTags } from '../CommentTags';
import { getLines } from '../comments/getLines';
import { ComponentWrapper, ComponentWrapperType } from './ComponentWrapper';
import { getWrapperNameFromPath } from './getWrapperNameFromPath';
import { isBuiltInWrapper } from './isBuiltInWrapper';

export function parseWrapperAnnotation(commentTag:string):ComponentWrapper[] {
  if (!commentTag.startsWith(CommentTags.UXPIN_WRAPPERS)) {
    return [];
  }

  const wrappersNames:string[] = parseCommentToLines(commentTag);

  return wrappersNames.map((name:string) => pathOrNameToWrapper(name));
}

function pathOrNameToWrapper(nameOrPath:string):ComponentWrapper {
  if (isBuiltInWrapper(nameOrPath)) {
    return {
      name: nameOrPath,
      type: ComponentWrapperType.BUILT_IN,
    };
  }

  return {
    name: getWrapperNameFromPath(nameOrPath),
    path: nameOrPath,
    type: ComponentWrapperType.CUSTOM,
  }
}

const STRIP_TAG_REGEX:RegExp = new RegExp(`^(\\s)?\\${CommentTags.UXPIN_WRAPPERS}(\\s+)?`);

function parseCommentToLines(commentTag:string):string[] {
  return getLines(commentTag.replace(STRIP_TAG_REGEX, ''))
    .reduce((lines:string[], line:string) => {
      return [
        ...lines,
        ...line.split(','),
      ]
    }, [])
    .filter(Boolean);
}
