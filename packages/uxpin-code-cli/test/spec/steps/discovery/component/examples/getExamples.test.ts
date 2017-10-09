import { resolve } from 'path';

import { ComponentExample } from '../../../../../../src/steps/discovery/component/examples/ComponentExample';
import { getExamples } from '../../../../../../src/steps/discovery/component/examples/getExamples';

describe('getExamples', () => {
  describe('getting list of examples', () => {
    it('should return list of examples for markdown file with many examples', () => {
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
      return getExamples(resolve('./test/resources/documentation/examples/DocumentationWithExamples.md'))
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
    });

    it('should return one example for markdown file with one example', () => {
      const expectedExamples:ComponentExample[] = [{
        code: '<DocumentationWithExamples />',
      }];

      // when
      return getExamples(resolve('./test/resources/documentation/examples/DocumentationWithOneExample.md'))
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
    });

    it('should return empty list for markdown file with no example', () => {
      const expectedExamples:ComponentExample[] = [];

      // when
      return getExamples(resolve('./test/resources/documentation/examples/DocumentationWithNoExample.md'))
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
    });

    it('should return list of supported examples for markdown file with both supported & unsupported examples', () => {
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
      return getExamples(resolve('./test/resources/documentation/examples/DocumentationWithNotSupportedExamples.md'))
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
    });
  });
});
