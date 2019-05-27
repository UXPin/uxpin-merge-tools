import { assign } from 'lodash';
import { isValidDescriptor } from '../../../props/descriptors/isValidDescriptor';
import { parseDescriptionTag } from '../../../props/descriptors/parseDescriptionTag';
import { parseHiddenTag } from '../../../props/descriptors/parseHiddenTag';
import { parseNameTag } from '../../../props/descriptors/parseNameTag';
import { ComponentPropertyCustomDescriptors, CustomDescriptorsTags } from '../../ComponentPropertyDefinition';

export function parseTags(tags:string[]):ComponentPropertyCustomDescriptors {
  return assign({}, ...tags.map(parseTag).filter(Boolean));
}

function parseTag(tag:string):Partial<ComponentPropertyCustomDescriptors> | undefined {
  const matches:RegExpMatchArray | null = tag.match(/(^@[a-z]+)(\ ?)+([^]+)?/m);
  if (!matches) {
    return {};
  }

  const [, descriptor,, value] = matches;
  if (!isValidDescriptor(descriptor)) {
    return {};
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
      return {};
    }

    default:
      return {};
  }
}
