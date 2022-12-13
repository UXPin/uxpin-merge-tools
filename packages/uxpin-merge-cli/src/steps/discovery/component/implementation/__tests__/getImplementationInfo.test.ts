import { ComponentImplementationInfo } from '../../ComponentInfo';
import { getImplementationInfo } from '../getImplementationInfo';

describe('getImplementationInfo', () => {
  describe('providing information about the implementation based on given file path', () => {
    it('returns react typescript info for path with `.tsx` extension', () => {
      // given
      const path = 'some/path/Component.react.tsx';
      const expectedInfo: ComponentImplementationInfo = {
        framework: 'reactjs',
        lang: 'typescript',
        path,
      };

      // then
      expect(getImplementationInfo(path)).toEqual(expectedInfo);
    });

    it('returns react typescript info for path with `.ts` extension', () => {
      // given
      const path = 'some/path/Component.ts';
      const expectedInfo: ComponentImplementationInfo = {
        framework: 'reactjs',
        lang: 'typescript',
        path,
      };

      // then
      expect(getImplementationInfo(path)).toEqual(expectedInfo);
    });

    it('returns react javascript info for path with `.jsx` extension', () => {
      // given
      const path = 'some/path/Component.jsx';
      const expectedInfo: ComponentImplementationInfo = {
        framework: 'reactjs',
        lang: 'javascript',
        path,
      };

      // then
      expect(getImplementationInfo(path)).toEqual(expectedInfo);
    });

    it('returns react javascript info for path with `.js` extension', () => {
      // given
      const path = 'some/path/Component.js';
      const expectedInfo: ComponentImplementationInfo = {
        framework: 'reactjs',
        lang: 'javascript',
        path,
      };

      // then
      expect(getImplementationInfo(path)).toEqual(expectedInfo);
    });

    it('return null when the given path is not JavaScript nor TypeScript file', () => {
      // given
      const path = 'some/path/Component.java';

      // then
      expect(getImplementationInfo(path)).toBeNull();
    });
  });
});
