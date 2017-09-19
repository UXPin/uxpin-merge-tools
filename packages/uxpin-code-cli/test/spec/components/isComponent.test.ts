import { resolve } from 'path';

import { isComponent } from '../../../src/components/isComponent';

describe('isComponent', () => {
  describe('for a directory', () => {
    it('returns true if directory contains component file', () => {
      const path:string = resolve('./test/resources/directories/directoryWithComponent');

      // when
      return isComponent(path, 'directoryWithComponent')
      // then
        .then((isComponentValue) => expect(isComponentValue).toBeTruthy());
    });

    it('returns true if directory contains TypeScript component file', () => {
      const path:string = resolve('./test/resources/directories/directoryWithTypeScriptComponent');

      // when
      return isComponent(path, 'directoryWithTypeScriptComponent')
      // then
        .then((isComponentValue) => expect(isComponentValue).toBeTruthy());
    });

    it('returns false if directory does not contain component file', () => {
      const path:string = resolve('./test/resources/directories/directoryWithoutComponent');

      // when
      return isComponent(path, 'directoryWithoutComponent')
      // then
        .then((isComponentValue) => expect(isComponentValue).toBeFalsy());
    });

    it('returns false if directory does not exist', () => {
      const path:string = resolve('./test/resources/directories/iDontExist');

      // when
      return isComponent(path, 'iDontExist')
      // then
        .then((isComponentValue) => expect(isComponentValue).toBeFalsy());
    });
  });

  describe('for a file', () => {
    it('returns false', () => {
      const path:string = resolve('./test/resources/directories/notDirectory.ts');

      // when
      return isComponent(path, 'notDirectory.ts')
      // then
        .then((isComponentValue) => expect(isComponentValue).toBeFalsy());
    });
  });

});
