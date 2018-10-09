import { sortFilePaths } from '../sortFilePaths';

describe('sortFilePaths', () => {
  it('correctly sorts paths to files ', () => {
    // given
    const paths:string[] = [
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

    const expectedPaths:string[] = [
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
    const result:string[] = sortFilePaths(paths);

    // then
    expect(result).toEqual(expectedPaths);
  });
});
