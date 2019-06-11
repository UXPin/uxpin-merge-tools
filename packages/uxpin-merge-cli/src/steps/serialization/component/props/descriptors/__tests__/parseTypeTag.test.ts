import { using } from '../../../../../../../test/utils/using';
import {
  ComponentPropertyCustomDescriptors,
  CustomControlTypeName,
} from '../../../implementation/ComponentPropertyDefinition';
import { parseTypeTag } from '../parseTypeTag';

const cases:TestCase[] = [
  ...Object.values(CustomControlTypeName)
    .filter((customType) => customType !== CustomControlTypeName.Textfield)
    .map((customType) => {
      return {
        expectedValue: {
          customType: {
            name: customType,
            structure: {},
          },
        },
        tag: customType,
      };
    }),
  {
    expectedValue: {
      customType: {
        name: CustomControlTypeName.Textfield,
        structure: {
          rows: 3,
        },
      },
    },
    tag: 'textfield',
  },
  {
    expectedValue: {
      customType: {
        name: CustomControlTypeName.Textfield,
        structure: {
          rows: 10000,
        },
      },
    },
    tag: 'textfield(10000)',
  },
  {
    expectedValue: undefined,
    tag: 'textfield(Infinity)',
  },
  {
    expectedValue: undefined,
    tag: 'textfield(abc)',
  },
  {
    expectedValue: undefined,
    tag: 'unknown',
  },
];

describe('parseTypeTag', () => {
  using(cases)
    .describe('should parse custom types', ({ tag, expectedValue }) => {
      it(tag, () => expect(parseTypeTag(tag)).toEqual(expectedValue));
    });
});

interface TestCase {
  expectedValue:Pick<ComponentPropertyCustomDescriptors, 'customType'> | undefined;
  tag:CustomControlTypeName | string;
}
