import { resolve } from 'path';

import { ComponentExample } from '../../../../../../src/steps/serialization/component/examples/ComponentExample';
import { serializeExamples } from '../../../../../../src/steps/serialization/component/examples/serializeExamples';

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

      // when
      return serializeExamples(path)
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
    });

    it('should return one example for markdown file with one example', () => {
      const path:string = resolve('./test/resources/documentation/examples/DocumentationWithOneExample.md');
      const expectedExamples:ComponentExample[] = [{
        code: '<DocumentationWithExamples />',
      }];

      // when
      return serializeExamples(path)
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
    });

    it('should return empty list for markdown file with no example', () => {
      const path:string = resolve('./test/resources/documentation/examples/DocumentationWithNoExample.md');
      const expectedExamples:ComponentExample[] = [];

      // when
      return serializeExamples(path)
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
    });

    it('should return empty list for markdown file with examples defined with tab char', () => {
      const path:string = resolve('./test/resources/documentation/examples/DocumentationWithTabCharacterExamples.md');
      const expectedExamples:ComponentExample[] = [];

      // when
      return serializeExamples(path)
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
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

      // when
      return serializeExamples(path)
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
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

      // when
      return serializeExamples(path)
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
    });
  });
});
