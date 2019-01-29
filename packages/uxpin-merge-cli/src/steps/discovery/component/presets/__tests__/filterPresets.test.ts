import { filterPresets } from '../filterPresets';

describe('filterPresets', () => {
  it('should return paths that meet preset filename pattern only', () => {
    // having
    const paths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/notPresetDir',
      './test/resources/directories/directoryWithPresets/presets/0-default.jsx',
      './test/resources/directories/directoryWithPresets/presets/1-basic.jsx',
      './test/resources/directories/directoryWithPresets/presets/2-advanced.jsx',
      './test/resources/directories/directoryWithPresets/presets/3-notPreset1.jsx',
      './test/resources/directories/directoryWithPresets/presets/4-notPreset1.json',
      './test/resources/directories/directoryWithPresets/presets/9notPreset2.jsx',
      './test/resources/directories/directoryWithPresets/presets/notPreset2.txt',
    ];

    const expectedPaths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/0-default.jsx',
      './test/resources/directories/directoryWithPresets/presets/1-basic.jsx',
      './test/resources/directories/directoryWithPresets/presets/2-advanced.jsx',
      './test/resources/directories/directoryWithPresets/presets/3-notPreset1.jsx',
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
