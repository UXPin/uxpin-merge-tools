import { isDefined } from '../../../../../../common/isDefined';
import { isValidDescriptor } from '../../../props/parsing/descriptors/isValidDescriptor';
import { parseBindTag } from '../../../props/parsing/descriptors/parseBindTag';
import { parseDescriptionTag } from '../../../props/parsing/descriptors/parseDescriptionTag';
import { parseHiddenTag } from '../../../props/parsing/descriptors/parseHiddenTag';
import { parseNameTag } from '../../../props/parsing/descriptors/parseNameTag';
import { parseTypeTag } from '../../../props/parsing/descriptors/parseTypeTag';
import { CustomDescriptorsTags } from '../../ComponentPropertyDefinition';
import { ParsedPropertyDescriptor } from '../../ParsedPropertyDescriptor';

export function parseTags(tags: string[]): ParsedPropertyDescriptor[] {
  return tags.map(parseTag).filter(isDefined);
}

function parseTag(tag: string): ParsedPropertyDescriptor | undefined {
  const matches: RegExpMatchArray | null = tag.match(/(^@[a-z]+)(\ ?)+([^]+)?/m);
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
