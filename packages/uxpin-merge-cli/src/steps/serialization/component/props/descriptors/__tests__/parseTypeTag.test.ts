import { using } from '../../../../../../../test/utils/using';
import { CustomControlTypeName, ComponentPropertyCustomDescriptors } from '../../../implementation/ComponentPropertyDefinition';
import { parseTypeTag } from '../parseTypeTag';

const cases:TestCase[] = [
  ...Object.values(CustomControlTypeName)
    .filter((customType) => customType !== CustomControlTypeName.Textfield)
    .map((customType) => {
      return {
        tag: customType,
        expectedValue: {
          customType: {
            name: customType,
            structure: {},
          },
        },
      };
    }),
  {
    tag: 'textfield',
    expectedValue: {
      customType: {
        name: CustomControlTypeName.Textfield,
        structure: {
          rows: 3,
        },
      },
    },
  },
  {
    tag: 'textfield(10000)',
    expectedValue: {
      customType: {
        name: CustomControlTypeName.Textfield,
        structure: {
          rows: 10000,
        },
      },
    },
  },
  {
    tag: 'textfield(Infinity)',
    expectedValue: undefined,
  },
  {
    tag: 'textfield(abc)',
    expectedValue: undefined,
  },
  {
    tag: 'unknown',
    expectedValue: undefined,
  },
];

describe('parseTypeTag', () => {
  using(cases)
    .describe('should parse custom types', ({ tag, expectedValue }) => {
      it(tag, () => expect(parseTypeTag(tag)).toEqual(expectedValue))
    });
});

interface TestCase {
  tag:CustomControlTypeName | string,
  expectedValue:Pick<ComponentPropertyCustomDescriptors, 'customType'> | undefined,
}
