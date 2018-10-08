import { resolve } from 'path';

import { ComponentExample } from '../ComponentExample';
import {
  ExamplesSerializationResult,
} from '../ExamplesSerializationResult';
import { serializeExamples } from '../serializeExamples';

describe('getExamples', () => {
  describe('getting list of examples', () => {
    it('should return list of examples for markdown file with many examples', () => {
      const path:string = resolve('./test/resources/documentation/examples/DocumentationWithExamples.md');
      const expectedExamples:ComponentExample[] = [
        {
          code: '<DocumentationWithExamples />',
        },
        {
          code: '<DocumentationWithExamples primary />',
        },
        {
          code: '<DocumentationWithExamples disabled />',
        },
      ];
      const expectedResult:ExamplesSerializationResult = {
        result: expectedExamples,
        warnings: [],
      };

      // when
      return serializeExamples(path)
      // then
        .then((result) => expect(result).toEqual(expectedResult));
    });

    it('should return one example for markdown file with one example', () => {
      const path:string = resolve('./test/resources/documentation/examples/DocumentationWithOneExample.md');
      const expectedExamples:ComponentExample[] = [{
        code: '<DocumentationWithExamples />',
      }];
      const expectedResult:ExamplesSerializationResult = {
        result: expectedExamples,
        warnings: [],
      };

      // when
      return serializeExamples(path)
      // then
        .then((result) => expect(result).toEqual(expectedResult));
    });

    it('should return empty list for markdown file with no example', () => {
      const path:string = resolve('./test/resources/documentation/examples/DocumentationWithNoExample.md');
      const expectedExamples:ComponentExample[] = [];
      const expectedResult:ExamplesSerializationResult = {
        result: expectedExamples,
        warnings: [],
      };

      // when
      return serializeExamples(path)
      // then
        .then((result) => expect(result).toEqual(expectedResult));
    });

    it('should return empty list for markdown file with examples defined with tab char', () => {
      const path:string = resolve('./test/resources/documentation/examples/DocumentationWithTabCharacterExamples.md');
      const expectedExamples:ComponentExample[] = [];
      const expectedResult:ExamplesSerializationResult = {
        result: expectedExamples,
        warnings: [],
      };

      // when
      return serializeExamples(path)
      // then
        .then((result) => expect(result).toEqual(expectedResult));
    });

    it('should return list of supported examples for markdown file with both supported & unsupported examples', () => {
      const path:string = resolve('./test/resources/documentation/examples/DocumentationWithNotSupportedExamples.md');
      const expectedExamples:ComponentExample[] = [
        {
          code: '<DocumentationWithExamples javascript />',
        },
        {
          code: '<DocumentationWithExamples jsx />',
        },
        {
          code: '<DocumentationWithExamples typescript />',
        },
        {
          code: '<DocumentationWithExamples tsx />',
        },
      ];
      const expectedResult:ExamplesSerializationResult = {
        result: expectedExamples,
        warnings: [],
      };

      // when
      return serializeExamples(path)
      // then
        .then((result) => expect(result).toEqual(expectedResult));
    });

    it('should return list of multiline examples for markdown file with examples', () => {
      const path:string = resolve('./test/resources/documentation/examples/DocumentationWithMultilineExamples.md');
      const expectedExamples:ComponentExample[] = [
        {
          code: `<DocumentationWithMultilineExamples>
    <Line />
    <Line />
    <Line />
</DocumentationWithMultilineExamples>`,
        },
        {
          code: `// See first example
<DocumentationWithMultilineExamples>
    <Line />
    <Line />
    <Line />
</DocumentationWithMultilineExamples>`,
        },
      ];
      const expectedResult:ExamplesSerializationResult = {
        result: expectedExamples,
        warnings: [],
      };

      // when
      return serializeExamples(path)
      // then
        .then((result) => expect(result).toEqual(expectedResult));
    });
  });

  describe('when error occurs', () => {
    it('should return warning', () => {
      const expectedErrorMessage:string = 'Cannot serialize component examples';
      const expectedOriginalErrorMessage:string = 'no such file or directory';
      const path:string = resolve('./test/resources/documentation/examples/DontExist.md');

      // when
      return serializeExamples(path)
      // then
        .then((result) => {
          expect(result.warnings).toHaveLength(1);
          expect(result.warnings[0].message).toEqual(expectedErrorMessage);
          expect((result.warnings[0].originalError as Error).message).toMatch(expectedOriginalErrorMessage);
        });
    });
  });
});
