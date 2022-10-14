import { getUniqPresetImportName } from '../getUniqPresetImportName';

describe('getUniqPresetImportName', () => {
  it('should return valid import name', () => {
    // given
    const path = './src/components/Button/presets/0-default.jsx';
    const expectedImportName = 'Preset445bc29ee1845bac85fade5cad39109d';

    // when
    const result: string = getUniqPresetImportName(path);

    // then
    expect(result).toEqual(expectedImportName);
  });

  it('should return the same import name for the same input', () => {
    // given
    const path1 = './src/components/Button/presets/1-basic.jsx';
    const path2 = './src/components/Button/presets/1-basic.jsx';

    // when
    const result1: string = getUniqPresetImportName(path1);
    const result2: string = getUniqPresetImportName(path2);

    // then
    expect(result1).toEqual(result2);
  });

  it('should return different import name for different input', () => {
    // given
    const path1 = './src/components/Button/presets/1-basic.jsx';
    const path2 = './src/components/Card/presets/1-basic.jsx';

    // when
    const result1: string = getUniqPresetImportName(path1);
    const result2: string = getUniqPresetImportName(path2);

    // then
    expect(result1).not.toEqual(result2);
  });
});
