import { isDefined } from '../../../../../common/isDefined';
import { CustomDescriptorsTags } from '../../../../../steps/serialization/component/implementation/ComponentPropertyDefinition';
import { ParsedPropertyDescriptor } from '../../../../../steps/serialization/component/implementation/ParsedPropertyDescriptor';
import { isValidDescriptor } from '../../../../../steps/serialization/component/props/parsing/descriptors/isValidDescriptor';
import { parseBindTag } from '../../../../../steps/serialization/component/props/parsing/descriptors/parseBindTag';
import { parseDescriptionTag } from '../../../../../steps/serialization/component/props/parsing/descriptors/parseDescriptionTag';
import { parseHiddenTag } from '../../../../../steps/serialization/component/props/parsing/descriptors/parseHiddenTag';
import { parseNameTag } from '../../../../../steps/serialization/component/props/parsing/descriptors/parseNameTag';
import { parseTypeTag } from '../../../../../steps/serialization/component/props/parsing/descriptors/parseTypeTag';

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
