import { values } from 'lodash';
import { ComponentCategory } from '../../component/categories/ComponentCategory';
import { MovedFilePathsMap } from '../../DesignSystemSnapshot';
import { filterMovedFiles } from '../filterMovedFiles';

describe('filterMovedFiles', () => {
  let movedFiles:MovedFilePathsMap;
  let categorizedComponents:ComponentCategory[];

  beforeEach(() => {
    // given
    movedFiles = {
      'src/Bar/Bar.js': 'src/NewBar/NewBar.js',
      'src/Bar/presets/0-default.json': 'src/NewBar/presets/0-default.json',
      'src/Baz/Baz.js': 'src/NewBaz/NewBaz.js',
      'src/Baz/presets/0-default.json': 'src/NewBaz/presets/0-default.json',
      'src/Foo/Foo.js': 'src/NewFoo/NewFoo.js',
      'src/Foo/presets/0-default.json': 'src/NewFoo/presets/0-default.json',
      'webpack.config.js': 'webpack.config.prod.js',
    };

    categorizedComponents = [
      {
        components: [
          {
            defaultExported: true,
            documentation: { examples: [] },
            info: {
              dirPath: 'src/NewFoo',
              implementation: {
                framework: 'reactjs',
                lang: 'javascript',
                path: 'src/NewFoo/NewFoo.js',
              },
            },
            name: 'NewFoo',
            presets: [],
            properties: [],
          },
        ],
        name: 'General',
      },
      {
        components: [
          {
            defaultExported: true,
            documentation: { examples: [] },
            info: {
              dirPath: 'src/NewBar',
              implementation: {
                framework: 'reactjs',
                lang: 'javascript',
                path: 'src/NewBar/NewBar.js',
              },
            },
            name: 'NewBar',
            presets: [],
            properties: [],
          },
        ],
        name: 'Additional',
      },
    ];
  });

  describe('filtered', () => {
    let filtered:MovedFilePathsMap;

    beforeEach(() => {
      // when
      filtered = filterMovedFiles(movedFiles, categorizedComponents);
    });

    it('should contain moved files from all component categories', () => {
      // then
      expect(values(filtered)).toContain('src/NewFoo/NewFoo.js');
      expect(values(filtered)).toContain('src/NewBar/NewBar.js');
    });

    it('should not contain preset files', () => {
      // then
      expect(values(filtered)).not.toContain('src/NewBar/presets/0-default.json');
    });

    it('should not contain component\'s files that are not used in design system', () => {
      // then
      expect(values(filtered)).not.toContain('src/NewBaz/NewBaz.js');
    });

    it('should not contain files that are not used by design system', () => {
      // then
      expect(values(filtered)).not.toContain('webpack.config.prod.js');
    });
  });
});
