import { resolve } from 'path';
import { LIBRARY_DEFAULT_NAME } from '../../../experimentation/server/handler/libraries/GetLibrariesHandler';
import { ProjectPaths } from '../../paths/ProjectPaths';
import { getLibraryName } from '../getLibraryName';

describe('getLibraryName', () => {
  let paths:ProjectPaths;

  describe('config with library name', () => {
    beforeEach(() => {
      // having
      paths = {
        configPath: resolve(__dirname, '../../../../../test/resources/configs/with-name-uxpin.config.js'),
        projectRoot: __dirname,
      };
    });

    it('should retrieve library name from config', () => {
      // when
      const libraryName:string = getLibraryName(paths);

      // then
      expect(libraryName).toEqual('UXPin Library Name');
    });
  });

  describe('config without library name', () => {
    beforeEach(() => {
      // having
      paths = {
        configPath: resolve(__dirname, '../../../../../test/resources/configs/without-name-uxpin.config.js'),
        projectRoot: __dirname,
      };
    });

    it('should fallback to default library name if not provided in config', () => {
      // when
      const libraryName:string = getLibraryName(paths);

      // then
      expect(libraryName).toEqual(LIBRARY_DEFAULT_NAME);
    });
  });

  describe('without config', () => {
    beforeEach(() => {
      // having
      paths = {
        configPath: resolve(__dirname, './non-existing-uxpin.config.js'),
        projectRoot: __dirname,
      };
    });

    it('should fallback to default library name if config does not exist', () => {
      // when
      const libraryName:string = getLibraryName(paths);

      // then
      expect(libraryName).toEqual(LIBRARY_DEFAULT_NAME);
    });
  });
});
