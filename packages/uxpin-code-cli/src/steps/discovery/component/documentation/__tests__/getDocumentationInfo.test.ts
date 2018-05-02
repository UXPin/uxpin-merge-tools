import { resolve } from 'path';
import { ComponentDocumenationInfo } from '../../ComponentInfo';
import { ComponentPaths } from '../../ComponentPaths';
import { getDocumentationInfo } from '../getDocumentationInfo';

describe('getDocumentationInfo', () => {
  describe('obtaining info about the documentation of a component in the given directory', () => {
    it('recognizes and returns correct path to a `Readme.md` file', () => {
      const paths:ComponentPaths = getComponentsPath('directoryWithReadmeMarkdown');
      const expectedInfo:ComponentDocumenationInfo = {
        path: `directories/directoryWithReadmeMarkdown/Readme.md`,
      };

      // when
      return getDocumentationInfo(paths)
      // then
        .then((info) => expect(info).toEqual(expectedInfo));
    });

    it('recognizes and returns correct path to a `README.md` file', () => {
      const paths:ComponentPaths = getComponentsPath('directoryWithCapitalReadmeMarkdown');
      const expectedInfo:ComponentDocumenationInfo = {
        path: `directories/directoryWithCapitalReadmeMarkdown/README.md`,
      };

      // when
      return getDocumentationInfo(paths)
      // then
        .then((info) => expect(info).toEqual(expectedInfo));
    });

    it('recognizes and returns correct path to a markdown file with a name equal to a directory name', () => {
      const paths:ComponentPaths = getComponentsPath('directoryWithMarkdown');
      const expectedInfo:ComponentDocumenationInfo = {
        path: `directories/directoryWithMarkdown/directoryWithMarkdown.md`,
      };

      // when
      return getDocumentationInfo(paths)
      // then
        .then((info) => expect(info).toEqual(expectedInfo));
    });

    it('rejects a promise if a directory does not contain a documentation file', (done) => {
      const paths:ComponentPaths = getComponentsPath('directoryWithoutComponent');

      // when
      return getDocumentationInfo(paths)
      // then
        .catch(() => done());
    });

    it('rejects a promise if a directory does not exist', (done) => {
      const paths:ComponentPaths = getComponentsPath('iDontExist');

      // when
      getDocumentationInfo(paths)
      // then
        .catch(() => done());
    });

    describe('when the given directory pat is a path to a file', () => {
      it('rejects a promise', (done) => {
        const paths:ComponentPaths = getComponentsPath('notDirectory.ts');

        // when
        getDocumentationInfo(paths)
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
