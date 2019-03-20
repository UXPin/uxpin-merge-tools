import { using } from '../../../../../../../../test/utils/using';
import { PropertyType } from '../../../ComponentPropertyDefinition';
import { convertLiteralUnionSegment } from '../convertLiteralUnionSegment';

describe('convertLiteralUnionSegment', () => {
  describe('strings', () => {
    const cases:TestCase[] = [
      {
        expected: { name: 'literal', structure: { value: 'someValue' } },
        having: '"someValue"',
        title: 'parse literals with double quotes correctly',
      },
      {
        expected: { name: 'literal', structure: { value: 'someValue' } },
        having: `'someValue'`,
        title: 'parse literals with single quotes correctly',
      },
      {
        expected: null,
        having: '"without closing quote',
        title: 'return null when value can not be parsed',
      },
      {
        expected: null,
        having: '""',
        title: 'return null when value is empty',
      },
    ];

    using(cases)
      .describe('should', (testCase:TestCase) => {
        it(testCase.title, () => {
          expect(convertLiteralUnionSegment(testCase.having)).toEqual(testCase.expected);
        });
      });
  });

  describe('numbers', () => {
    const cases:TestCase[] = [
      {
        expected: { name: 'literal', structure: { value: 123 } },
        having: '123',
        title: 'parse numbers correctly',
      },
      {
        expected: { name: 'literal', structure: { value: -123 } },
        having: '-123',
        title: 'parse negative numbers correctly',
      },
      {
        expected: { name: 'literal', structure: { value: -123.4205403 } },
        having: '-123.4205403',
        title: 'parse float numbers correctly',
      },
      {
        expected: { name: 'literal', structure: { value: 0 } },
        having: '0',
        title: 'parse zero correctly',
      },
    ];

    using(cases)
      .describe('should', (testCase:TestCase) => {
        it(testCase.title, () => {
          expect(convertLiteralUnionSegment(testCase.having)).toEqual(testCase.expected);
        });
      });
  });
});

interface TestCase {
  title:string;
  having:string;
  expected:PropertyType<'literal'> | null;
}
