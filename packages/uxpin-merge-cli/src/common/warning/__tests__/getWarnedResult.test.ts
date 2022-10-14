import { getWarnedResult } from '../getWarnedResult';
import { Warned } from '../Warned';
import { WarningDetails } from '../WarningDetails';

interface Person {
  name: string;
}

describe('getWarnedResult', () => {
  describe('when result is given', () => {
    it('should be wrapped by object with warnings', () => {
      // having
      const result: Person = { name: 'Donald' };

      // when
      const warned: Warned<Person> = getWarnedResult(result);

      // then
      expect(warned).toEqual({
        result: { name: 'Donald' },
        warnings: [],
      });
    });
  });

  describe('when result and warnings are given', () => {
    it('should be wrapped by object with warinings', () => {
      // having
      const result: Person = { name: 'Donald' };
      const warnings: WarningDetails[] = [{ message: 'foo' }];

      // when
      const warned: Warned<Person> = getWarnedResult(result, warnings);

      // then
      expect(warned).toEqual({
        result: { name: 'Donald' },
        warnings: [{ message: 'foo' }],
      });
    });
  });
});
