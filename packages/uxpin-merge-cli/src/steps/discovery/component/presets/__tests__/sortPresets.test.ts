import { sortPresets } from '../sortPresets';

describe('sortPresets', () => {
  it('should return sorted paths according to index prefix', () => {
    // having
    const paths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/0002-default.jsx',
      './test/resources/directories/directoryWithPresets/presets/10-default.jsx',
      './test/resources/directories/directoryWithPresets/presets/5-basic.jsx',
      './test/resources/directories/directoryWithPresets/presets/2005-advanced.jsx',
      './test/resources/directories/directoryWithPresets/presets/0-default.jsx',
      './test/resources/directories/directoryWithPresets/presets/15-advanced.jsx',
    ];

    const expectedPaths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/0-default.jsx',
      './test/resources/directories/directoryWithPresets/presets/0002-default.jsx',
      './test/resources/directories/directoryWithPresets/presets/5-basic.jsx',
      './test/resources/directories/directoryWithPresets/presets/10-default.jsx',
      './test/resources/directories/directoryWithPresets/presets/15-advanced.jsx',
      './test/resources/directories/directoryWithPresets/presets/2005-advanced.jsx',
    ];

    // when
    const result:string[] = sortPresets(paths);

    // then
    expect(result).toEqual(expectedPaths);
  });

  it('should return paths with no index prefix at the end of the list', () => {
    // having
    const paths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/minimal.jsx',
      './test/resources/directories/directoryWithPresets/presets/10-default.jsx',
      './test/resources/directories/directoryWithPresets/presets/advanced.jsx',
      './test/resources/directories/directoryWithPresets/presets/5-basic.jsx',
    ];

    const expectedPaths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/5-basic.jsx',
      './test/resources/directories/directoryWithPresets/presets/10-default.jsx',
      './test/resources/directories/directoryWithPresets/presets/minimal.jsx',
      './test/resources/directories/directoryWithPresets/presets/advanced.jsx',
    ];

    // when
    const result:string[] = sortPresets(paths);

    // then
    expect(result).toEqual(expectedPaths);
  });

  it('should return unsorted paths if index prefix is not present', () => {
    // having
    const paths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/default.jsx',
      './test/resources/directories/directoryWithPresets/presets/basic.jsx',
      './test/resources/directories/directoryWithPresets/presets/advanced.jsx',
    ];

    const expectedPaths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/default.jsx',
      './test/resources/directories/directoryWithPresets/presets/basic.jsx',
      './test/resources/directories/directoryWithPresets/presets/advanced.jsx',
    ];

    // when
    const result:string[] = sortPresets(paths);

    // then
    expect(result).toEqual(expectedPaths);
  });
});
