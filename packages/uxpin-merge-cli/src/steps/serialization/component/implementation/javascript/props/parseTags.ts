import { isValidDescriptor } from '../../../props/descriptors/isValidDescriptor';
import { parseBindTag } from '../../../props/descriptors/parseBindTag';
import { parseDescriptionTag } from '../../../props/descriptors/parseDescriptionTag';
import { parseHiddenTag } from '../../../props/descriptors/parseHiddenTag';
import { parseNameTag } from '../../../props/descriptors/parseNameTag';
import { parseTypeTag } from '../../../props/descriptors/parseTypeTag';
import { CustomDescriptorsTags } from '../../ComponentPropertyDefinition';
import { ParsedPropertyDescriptor } from '../../ParsedPropertyDescriptor';

export function parseTags(propName:string, tags:string[]):ParsedPropertyDescriptor[] {
  return tags.map(parseTag(propName)).filter(isDefined);
}

function parseTag(propName:string):(tag:string) => ParsedPropertyDescriptor | undefined {
  return (tag) => {
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
        return parseDescriptionTag(propName, value);
      }

      case CustomDescriptorsTags.HIDDEN: {
        return parseHiddenTag(propName);
      }

      case CustomDescriptorsTags.NAME: {
        return parseNameTag(propName, value);
      }

      case CustomDescriptorsTags.TYPE: {
        return parseTypeTag(propName, value);
      }

      case CustomDescriptorsTags.BIND: {
        return parseBindTag(propName, value);
      }

      default:
        return;
    }
  };
}

function isDefined<T>(a:T | undefined):a is T {
  return Boolean(a);
}
