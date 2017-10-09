import { resolve } from 'path';

import { ComponentExample } from '../../../../../../src/steps/discovery/component/examples/ComponentExample';
import { getExamples } from '../../../../../../src/steps/discovery/component/examples/getExamples';

describe('getExamples', () => {
  describe('getting list of examples', () => {
    it('should return one example for markdown file with one example', () => {
      const expectedExamples:ComponentExample[] = [{
        code: '<DocumentationWithExamples />',
      }];

      // when
      return getExamples(resolve('./test/resources/documentation/examples/DocumentationWithOneExample.md'))
      // then
        .then((examples) => expect(examples).toEqual(expectedExamples));
    });
  });
});
