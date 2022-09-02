import { sortFilePaths } from '../sortFilePaths';

describe('sortFilePaths', () => {
  describe('when one-level deep paths are provided', () => {
    it('correctly sorts paths to files ', () => {
      // given
      const paths: string[] = [
        'src/input-autocomplete/input-autocomplete.jsx',
        'src/calendar/calendar.jsx',
        'src/amount/amount.js',
        'src/icon-button/icon-button.jsx',
        'src/checkbox/checkbox.jsx',
        'src/amount/amount.jsx',
        'src/checkbox-group/checkbox-group.jsx',
        'src/input-group/input-group.jsx',
        'src/icon/icon.jsx',
        'src/calendar-input/calendar-input.jsx',
        'src/amount/amount.gif',
        'src/input/input.jsx',
      ];

      const expectedPaths: string[] = [
        'src/amount/amount.gif',
        'src/amount/amount.js',
        'src/amount/amount.jsx',
        'src/calendar/calendar.jsx',
        'src/calendar-input/calendar-input.jsx',
        'src/checkbox/checkbox.jsx',
        'src/checkbox-group/checkbox-group.jsx',
        'src/icon/icon.jsx',
        'src/icon-button/icon-button.jsx',
        'src/input/input.jsx',
        'src/input-autocomplete/input-autocomplete.jsx',
        'src/input-group/input-group.jsx',
      ];

      // when
      // then
      expect(sortFilePaths(paths)).toEqual(expectedPaths);
    });
  });

  describe('when nested paths are given', () => {
    it('should correclty sort paths list', () => {
      // having
      const paths: string[] = [
        'src/components/Card/Card.js',
        'src/components/Card/components/Header/components/Button.js',
        'src/components/Button/Button.js',
        'src/components/Table/Table.js',
        'src/components/Card/components/Header/Header.js',
        'src/components/Icon/Icon.js',
        'src/components/Select/components/Item/Item.js',
        'src/components/Greeting/Greeting.js',
        'src/components/Select/components/Arrow/Arrow.js',
        'src/components/Select/Select.js',
      ];

      const expectedPaths: string[] = [
        'src/components/Button/Button.js',
        'src/components/Card/Card.js',
        'src/components/Card/components/Header/Header.js',
        'src/components/Card/components/Header/components/Button.js',
        'src/components/Greeting/Greeting.js',
        'src/components/Icon/Icon.js',
        'src/components/Select/Select.js',
        'src/components/Select/components/Arrow/Arrow.js',
        'src/components/Select/components/Item/Item.js',
        'src/components/Table/Table.js',
      ];

      // when
      // then
      expect(sortFilePaths(paths)).toEqual(expectedPaths);
    });
  });
});
