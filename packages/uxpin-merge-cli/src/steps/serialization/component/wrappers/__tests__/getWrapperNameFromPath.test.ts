import { getWrapperNameFromPath } from "../getWrapperNameFromPath";

describe('getWrapperNameFromPath', () => {
  describe('when path is provided', () => {
    it('should return file name as a wrapper name', () => {
      // having
      const path:string = './path/to/CustomWrapper.ts';

      // when
      // then
      expect(getWrapperNameFromPath(path)).toEqual('CustomWrapper');
    });
  });

  describe('when path is provided which contains built in component name', () => {
    it('should return file name with prefix as a wrapper name', () => {
      // having
      const path:string = './path/to/NonResizableWrapper.ts';

      // when
      // then
      expect(getWrapperNameFromPath(path)).toEqual('CustomNonResizableWrapper');
    });
  });
});
