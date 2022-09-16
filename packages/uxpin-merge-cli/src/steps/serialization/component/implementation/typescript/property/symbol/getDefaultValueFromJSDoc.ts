import * as ts from 'typescript';
import { ComponentPropertyDefinition } from '../../../ComponentPropertyDefinition';
import { PropertySymbol } from './isPropertySignatureSymbol';

const JSDOC_TAG_NAME = 'default';

export function getDefaultValueFromJSDoc(
  propertySymbol: PropertySymbol
): Pick<ComponentPropertyDefinition, 'defaultValue'> {
  let defaultTagValue: string | undefined = getDefaultTagValue(propertySymbol.getJsDocTags());
  if (!defaultTagValue) {
    return {};
  }
  defaultTagValue = replaceNonJSONQuotes(defaultTagValue);
  const defaultValue: any = parseDefaultTagValue(defaultTagValue);
  if (typeof defaultValue === 'undefined') {
    return {};
  }
  return { defaultValue: { value: defaultValue } };
}

function getDefaultTagValue(tags: ts.JSDocTagInfo[]): string | undefined {
  const defaultTag: ts.JSDocTagInfo | undefined = tags.find((t) => t.name === JSDOC_TAG_NAME);
  if (defaultTag) {
    return defaultTag.text;
  }
}

function parseDefaultTagValue(defaultTagValue: string): any | undefined {
  try {
    return JSON.parse(defaultTagValue);
  } catch {
    return;
  }
}

function replaceNonJSONQuotes(defaultValue: string): string {
  const QUOTES_REGEX = /^['`](.*)['`]$/gm;
  return defaultValue.replace(QUOTES_REGEX, `"$1"`);
}
