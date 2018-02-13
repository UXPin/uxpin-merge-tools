import { filterPresets } from '../../../../../../src/steps/discovery/component/presets/filterPresets';

describe('filterPresets', () => {
  it('should return paths that meet preset filename pattern only', () => {
    // having
    const paths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/notPresetDir',
      './test/resources/directories/directoryWithPresets/presets/0-default.json',
      './test/resources/directories/directoryWithPresets/presets/1-basic.json',
      './test/resources/directories/directoryWithPresets/presets/2-advanced.json',
      './test/resources/directories/directoryWithPresets/presets/3-notPreset1.json',
      './test/resources/directories/directoryWithPresets/presets/9notPreset2.json',
      './test/resources/directories/directoryWithPresets/presets/notPreset2.txt',
    ];

    const expectedPaths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/0-default.json',
      './test/resources/directories/directoryWithPresets/presets/1-basic.json',
      './test/resources/directories/directoryWithPresets/presets/2-advanced.json',
      './test/resources/directories/directoryWithPresets/presets/3-notPreset1.json',
    ];

    // when
    const result:string[] = filterPresets(paths);

    // then
    expect(result).toEqual(expectedPaths);
  });

  it('should return empty array if files do not exist', () => {
    // having
    const paths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/notExist',
      './test/resources/directories/directoryWithPresets/notExistPresets/notExist',
    ];

    const expectedPaths:string[] = [];

    // when
    const result:string[] = filterPresets(paths);

    // then
    expect(result).toEqual(expectedPaths);
  });
});
