import { resolve } from 'path';
import { ComponentImplementationInfo } from '../../../../../src/components/ComponentInfo';
import { getImplementationInfo } from '../../../../../src/components/discovery/getImplementationInfo';

describe('getImplementationInfo', () => {
  describe('obtaining information about the implementation of a component in the given directory', () => {
    it('returns correct info if directory contains component file', () => {
      const path:string = resolve('./test/resources/directories/directoryWithComponent');
      const expectedImplInfo:ComponentImplementationInfo = {
        framework: 'reactjs',
        lang: 'javascript',
        path: `${path}/directoryWithComponent.jsx`,
      };

      // when
      return getImplementationInfo(path, 'directoryWithComponent')
      // then
        .then((implInfo) => expect(implInfo).toEqual(expectedImplInfo));
    });

    it('returns correct info if directory contains TypeScript component file', () => {
      const path:string = resolve('./test/resources/directories/directoryWithTypeScriptComponent');
      const expectedImplInfo:ComponentImplementationInfo = {
        framework: 'reactjs',
        lang: 'typescript',
        path: `${path}/directoryWithTypeScriptComponent.tsx`,
      };

      // when
      return getImplementationInfo(path, 'directoryWithTypeScriptComponent')
      // then
        .then((implInfo) => expect(implInfo).toEqual(expectedImplInfo));
    });

    it('rejects a promise if directory does not contain component file', (done) => {
      const path:string = resolve('./test/resources/directories/directoryWithoutComponent');

      // when
      return getImplementationInfo(path, 'directoryWithoutComponent')
      // then
        .catch(() => done());
    });

    it('rejects a promise if directory does not exist', (done) => {
      const path:string = resolve('./test/resources/directories/iDontExist');

      // when
      return getImplementationInfo(path, 'iDontExist')
      // then
        .catch(() => done());
    });

    describe('when the given directory path is a path to a file', () => {
      it('rejects a promise', (done) => {
        const path:string = resolve('./test/resources/directories/notDirectory.ts');

        // when
        return getImplementationInfo(path, 'notDirectory.ts')
        // then
          .catch(() => done());
      });
    });
  });
});
