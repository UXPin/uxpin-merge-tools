import { toNumber } from 'lodash';
import { PropertyType } from '../../ComponentPropertyDefinition';

const LITERAL_TYPE_REGEX:RegExp = /(^['"]([^"']+)['"]$)|(\d+)/;

export function convertLiteralUnionSegment(value:string):PropertyType<'literal'> | null {
  const literalMatch:RegExpMatchArray | null = value.match(LITERAL_TYPE_REGEX);

  if (!literalMatch) {
    return null;
  }

  const literalValue:string|number|null = getValue(literalMatch);
  if (!literalValue) {
    return null;
  }

  return { name: 'literal', structure: { value: literalValue } };
}

function getValue(match:RegExpMatchArray):string|number|null {
  if (match[3] === undefined) {
    return match[2];
  }

  const numberValue:number = toNumber(match[3]);
  return isNaN(numberValue)
    ? null
    : numberValue;
}
