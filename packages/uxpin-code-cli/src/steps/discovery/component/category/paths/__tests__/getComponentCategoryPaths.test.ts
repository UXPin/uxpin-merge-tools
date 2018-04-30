import { join } from 'path';
import { using } from '../../../../../../../test/utils/using';
import { CategoryConfig } from '../../../../config/CliConfig';
import { getComponentCategoryPaths } from '../getComponentCategoryPaths';

describe('getComponentCategoryPaths', () => {
  describe('returning list of component file paths for given category configuration', () => {

    interface TestCase {
      caseName:string;
      config:CategoryConfig;
      projectRoot:string;
      expectedPaths:string[];
    }

    const testProjectPath:string = join(__dirname, 'resources', 'jsProjectWithSrcDir');
    const cases:TestCase[] = [
      {
        caseName: 'two patterns using single-start expressions specifying file extension',
        config: {
          include: [
            'src/*/*.js',
            'src/Icons/*/*.jsx',
          ],
          name: 'Category Name',
        },
        expectedPaths: [
          'src/FirstComponent/FirstComponent.js',
          'src/SecondComponent/SecondComponent.js',
          'src/Icons/Flower/index.jsx',
          'src/Icons/Search/index.jsx',
        ],
        projectRoot: testProjectPath,
      },
      {
        caseName: 'two patterns specifying multiple extensions',
        config: {
          include: [
            'src/*/*.js',
            'src/Icons/*/*.{jsx,js}',
          ],
          name: 'Category Name',
        },
        expectedPaths: [
          'src/FirstComponent/FirstComponent.js',
          'src/SecondComponent/SecondComponent.js',
          'src/Icons/Flower/index.jsx',
          'src/Icons/Play/Play.js',
          'src/Icons/Search/index.jsx',
        ],
        projectRoot: testProjectPath,
      },
      {
        caseName: 'single pattern',
        config: {
          include: 'src/*/*.js',
          name: 'Category Name',
        },
        expectedPaths: [
          'src/FirstComponent/FirstComponent.js',
          'src/SecondComponent/SecondComponent.js',
        ],
        projectRoot: testProjectPath,
      },
      {
        caseName: 'single multi-level pattern with exclusion and optional fragment',
        config: {
          include: 'src/**/!(index).js?(x)',
          name: 'Category Name',
        },
        expectedPaths: [
          'src/FirstComponent/FirstComponent.js',
          'src/SecondComponent/SecondComponent.js',
          'src/Icons/Play/Play.js',
          'src/Icons/Flower/SunFlower/SunFlower.jsx',
        ],
        projectRoot: testProjectPath,
      },
      {
        caseName: 'single expression matching no files',
        config: {
          include: 'src/**/*.ts',
          name: 'Category Name',
        },
        expectedPaths: [],
        projectRoot: testProjectPath,
      },
      {
        caseName: 'multiple expressions matching no files',
        config: {
          include: [
            'src/**/*.ts',
            'src/**/*.tsx',
          ],
          name: 'Category Name',
        },
        expectedPaths: [],
        projectRoot: testProjectPath,
      },
    ];

    using(cases).describe('correctly returns paths for', ({ caseName, config, expectedPaths, projectRoot }) => {
      it(caseName, async () => {
        // when
        const result:string[] = await getComponentCategoryPaths(projectRoot, config);

        // then
        expect(result).toEqual(expectedPaths);
      });
    });
  });
});
