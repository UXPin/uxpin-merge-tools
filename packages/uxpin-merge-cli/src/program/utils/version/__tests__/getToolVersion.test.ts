import { resolve } from 'path';
import { getToolVersion } from '../getToolVersion';

describe('getToolVersion', () => {
  it('should return proper tool version', () => {
    // having
    const path: string = resolve(__dirname, '../../../../../test/resources/configs/package.json');

    // when
    const version: string = getToolVersion(path);

    // then
    expect(version).toEqual('0.0.20');
  });
});
