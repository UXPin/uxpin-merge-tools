import { isValidDescriptor } from '../../../props/descriptors/isValidDescriptor';
import { parseBindTag } from '../../../props/descriptors/parseBindTag';
import { parseDescriptionTag } from '../../../props/descriptors/parseDescriptionTag';
import { parseHiddenTag } from '../../../props/descriptors/parseHiddenTag';
import { parseNameTag } from '../../../props/descriptors/parseNameTag';
import { parseTypeTag } from '../../../props/descriptors/parseTypeTag';
import { CustomDescriptorsTags } from '../../ComponentPropertyDefinition';
import { ParsedPropertyDescriptor } from '../../ParsedPropertyDescriptor';

export function parseTags(tags:string[]):ParsedPropertyDescriptor[] {
  return tags.map(parseTag).filter(isDefined);
}

function parseTag(tag:string):ParsedPropertyDescriptor | undefined {
  const matches:RegExpMatchArray | null = tag.match(/(^@[a-z]+)(\ ?)+([^]+)?/m);
  if (!matches) {
    return;
  }

  const [, descriptor, , value] = matches;
  if (!isValidDescriptor(descriptor)) {
    return;
  }

  switch (descriptor) {
    case CustomDescriptorsTags.DESCRIPTION: {
      return parseDescriptionTag(value);
    }

    case CustomDescriptorsTags.HIDDEN: {
      return parseHiddenTag();
    }

    case CustomDescriptorsTags.NAME: {
      return parseNameTag(value);
    }

    case CustomDescriptorsTags.TYPE: {
      return parseTypeTag(value);
    }

    case CustomDescriptorsTags.BIND: {
      return parseBindTag(value);
    }

    default:
      return;
  }
}

function isDefined<T>(a:T | undefined):a is T {
  return Boolean(a);
}
