import { readFile } from 'fs-extra';
import { readFileFromPath } from '../readFileFromPath';

jest.mock('fs-extra');

describe('readFileFromPath', () => {
  it('should readFile from specific path using fs-extra', async () => {
    // given
    const path:string = 'path';

    // when
    await readFileFromPath(path);

    // then
    expect(readFile).toHaveBeenCalledWith(path);
  });
});
