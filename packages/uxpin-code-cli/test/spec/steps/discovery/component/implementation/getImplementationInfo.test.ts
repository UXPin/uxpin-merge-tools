import { resolve } from 'path';
import { ComponentImplementationInfo } from '../../../../../../src/steps/discovery/component/ComponentInfo';
import { ComponentPaths } from '../../../../../../src/steps/discovery/component/ComponentPaths';
// tslint:disable-next-line:max-line-length
import { getImplementationInfo } from '../../../../../../src/steps/discovery/component/implementation/getImplementationInfo';

describe('getImplementationInfo', () => {
  describe('obtaining information about the implementation of a component in the given directory', () => {
    it('returns correct info if directory contains component file', () => {
      const paths:ComponentPaths = getComponentsPath('directoryWithComponent');
      const expectedImplInfo:ComponentImplementationInfo = {
        framework: 'reactjs',
        lang: 'javascript',
        path: `directories/directoryWithComponent/directoryWithComponent.jsx`,
      };

      // when
      return getImplementationInfo(paths)
      // then
        .then((implInfo) => expect(implInfo).toEqual(expectedImplInfo));
    });

    it('returns correct info if directory contains TypeScript component file', () => {
      const paths:ComponentPaths = getComponentsPath('directoryWithTypeScriptComponent');
      const expectedImplInfo:ComponentImplementationInfo = {
        framework: 'reactjs',
        lang: 'typescript',
        path: `directories/directoryWithTypeScriptComponent/directoryWithTypeScriptComponent.tsx`,
      };

      // when
      return getImplementationInfo(paths)
      // then
        .then((implInfo) => expect(implInfo).toEqual(expectedImplInfo));
    });

    it('rejects a promise if directory does not contain component file', (done) => {
      const paths:ComponentPaths = getComponentsPath('directoryWithoutComponent');

      // when
      return getImplementationInfo(paths)
      // then
        .catch(() => done());
    });

    it('rejects a promise if directory does not exist', (done) => {
      const paths:ComponentPaths = getComponentsPath('iDontExist');

      // when
      return getImplementationInfo(paths)
      // then
        .catch(() => done());
    });

    describe('when the given directory path is a path to a file', () => {
      it('rejects a promise', (done) => {
        const paths:ComponentPaths = getComponentsPath('notDirectory.ts');

        // when
        return getImplementationInfo(paths)
        // then
          .catch(() => done());
      });
    });
  });

  function getComponentsPath(componentDirName:string):ComponentPaths {
    return {
      componentDirName,
      componentDirPath: `directories/${componentDirName}`,
      componentsDirPath: 'directories/',
      projectRoot: resolve('./test/resources/'),
    };
  }
});
