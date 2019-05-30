import { using } from '../../../../../../../test/utils/using';
import { CustomDescriptorsTags } from '../../../implementation/ComponentPropertyDefinition';
import { isValidDescriptor } from '../isValidDescriptor';

interface TestCase {
  descriptor:string;
  expectedValue:boolean;
}

const cases:TestCase[] = [
  ...Object.values(CustomDescriptorsTags).map((descriptor:string) => ({
    descriptor,
    expectedValue: true,
  })),
  {
    descriptor: '@somefaketag',
    expectedValue: false,
  },
];

describe('isValidDescriptor', () => {
  using(cases)
    .describe('correctly returns paths for', (testCase:TestCase) => {
      const { descriptor, expectedValue } = testCase;

      it(`should return ${expectedValue} for ${descriptor}`, () => {
        expect(isValidDescriptor(descriptor)).toEqual(expectedValue);
      });
    });
});
