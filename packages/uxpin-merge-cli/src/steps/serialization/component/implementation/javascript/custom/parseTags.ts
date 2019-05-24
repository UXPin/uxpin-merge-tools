import { assign } from 'lodash';
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

function parseDescriptionTag(value:string):Pick<ComponentPropertyCustomDescriptors, 'customDescription'> | undefined {
  if (!value) {
    return;
  }

  return {
    customDescription: value,
  };
}

function parseHiddenTag():Pick<ComponentPropertyCustomDescriptors, 'hidden'> {
  return {
    hidden: true,
  };
}

function parseNameTag(value:string):Pick<ComponentPropertyCustomDescriptors, 'customName'> | undefined {
  if (!value) {
    return;
  }

  return {
    customName: value,
  };
}

function isValidDescriptor(descriptor:any):descriptor is CustomDescriptorsTags {
  return Object.values(CustomDescriptorsTags).includes(descriptor);
}
