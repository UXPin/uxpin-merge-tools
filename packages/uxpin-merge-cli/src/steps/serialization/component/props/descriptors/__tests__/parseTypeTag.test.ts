import { using } from '../../../../../../../test/utils/using';
import { CustomControlTypeName, CustomDescriptorsTags } from '../../../implementation/ComponentPropertyDefinition';
import { ParsedPlainPropertyDescriptor } from '../../../implementation/ParsedPropertyDescriptor';
import { parseTypeTag } from '../parseTypeTag';

const propName:string = 'somePropName';

const cases:TestCase[] = [
  ...Object.values(CustomControlTypeName)
    .filter((customType) => customType !== CustomControlTypeName.Textfield)
    .map((customType) => {
      return {
        expectedValue: {
          propName,
          serialized: {
            customType: {
              name: customType,
              structure: {},
            },
          },
          type: CustomDescriptorsTags.TYPE as CustomDescriptorsTags.TYPE,
        },
        tag: customType,
      };
    }),
  {
    expectedValue: {
      propName,
      serialized: {
        customType: {
          name: CustomControlTypeName.Textfield,
          structure: {
            rows: 3,
          },
        },
      },
      type: CustomDescriptorsTags.TYPE,
    },
    tag: 'textfield',
  },
  {
    expectedValue: {
      propName,
      serialized: {
        customType: {
          name: CustomControlTypeName.Textfield,
          structure: {
            rows: 10000,
          },
        },
      },
      type: CustomDescriptorsTags.TYPE,
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
      it(tag, () => expect(parseTypeTag(propName, tag)).toEqual(expectedValue));
    });
});

interface TestCase {
  expectedValue:ParsedPlainPropertyDescriptor | undefined;
  tag:CustomControlTypeName | string;
}
