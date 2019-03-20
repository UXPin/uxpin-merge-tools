import { toNumber } from 'lodash';
import { PropertyType } from '../../ComponentPropertyDefinition';

const LITERAL_TYPE_REGEX:RegExp = /(^['"]([^"']+)['"]$)|(\-?\d+(\.\d+)?)/;
const NUMBER_GROUP_ID:number = 3;
const STRING_GROUP_ID:number = 2;

export function convertLiteralUnionSegment(value:string):PropertyType<'literal'> | null {
  const literalMatch:RegExpMatchArray | null = value.match(LITERAL_TYPE_REGEX);
  if (!literalMatch) {
    return null;
  }

  const literalValue:string|number|null = getValue(literalMatch);
  if (literalValue === null) {
    return null;
  }

  return { name: 'literal', structure: { value: literalValue } };
}

function getValue(match:RegExpMatchArray):string|number|null {
  if (match[NUMBER_GROUP_ID] === undefined) {
    return match[STRING_GROUP_ID];
  }

  const numberValue:number = toNumber(match[NUMBER_GROUP_ID]);
  return isNaN(numberValue)
    ? null
    : numberValue;
}
