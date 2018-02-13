import { sortPresets } from '../../../../../../src/steps/discovery/component/presets/sortPresets';

describe('sortPresets', () => {
  it('should return sorted paths according to index prefix', () => {
    // having
    const paths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/0002-default.json',
      './test/resources/directories/directoryWithPresets/presets/10-default.json',
      './test/resources/directories/directoryWithPresets/presets/5-basic.json',
      './test/resources/directories/directoryWithPresets/presets/2005-advanced.json',
      './test/resources/directories/directoryWithPresets/presets/0-default.json',
      './test/resources/directories/directoryWithPresets/presets/15-advanced.json',
    ];

    const expectedPaths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/0-default.json',
      './test/resources/directories/directoryWithPresets/presets/0002-default.json',
      './test/resources/directories/directoryWithPresets/presets/5-basic.json',
      './test/resources/directories/directoryWithPresets/presets/10-default.json',
      './test/resources/directories/directoryWithPresets/presets/15-advanced.json',
      './test/resources/directories/directoryWithPresets/presets/2005-advanced.json',
    ];

    // when
    const result:string[] = sortPresets(paths);

    // then
    expect(result).toEqual(expectedPaths);
  });

  it('should return unsorted paths if index prefix is not present', () => {
    // having
    const paths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/default.json',
      './test/resources/directories/directoryWithPresets/presets/basic.json',
      './test/resources/directories/directoryWithPresets/presets/advanced.json',
    ];

    const expectedPaths:string[] = [
      './test/resources/directories/directoryWithPresets/presets/default.json',
      './test/resources/directories/directoryWithPresets/presets/basic.json',
      './test/resources/directories/directoryWithPresets/presets/advanced.json',
    ];

    // when
    const result:string[] = sortPresets(paths);

    // then
    expect(result).toEqual(expectedPaths);
  });
});
