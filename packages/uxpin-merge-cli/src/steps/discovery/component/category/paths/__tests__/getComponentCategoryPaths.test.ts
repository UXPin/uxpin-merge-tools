import { join } from 'path';
import { using } from '../../../../../../../test/utils/using';
import { CategoryConfig } from '../../../../config/CliConfig';
import { getComponentCategoryPaths, InvalidPatternError } from '../getComponentCategoryPaths';

describe('getComponentCategoryPaths', () => {
  describe('returning list of component file paths for given category configuration', () => {

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
          'src/Icons/Flower/index.jsx',
          'src/Icons/Search/index.jsx',
          'src/SecondComponent/SecondComponent.js',
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
          'src/Icons/Flower/index.jsx',
          'src/Icons/Play/Play.js',
          'src/Icons/Search/index.jsx',
          'src/SecondComponent/SecondComponent.js',
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
          'src/Icons/Flower/SunFlower/SunFlower.jsx',
          'src/Icons/Play/Play.js',
          'src/SecondComponent/SecondComponent.js',
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
        expectedToThrow: InvalidPatternError,
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
        expectedToThrow: InvalidPatternError,
        projectRoot: testProjectPath,
      },
      {
        caseName: 'patterns matching directory are ignored',
        config: {
          include: [
            'src/*/*.js',
            'src/Icons/',
            'src/Icons/*',
          ],
          name: 'Category Name',
        },
        expectedPaths: [],
        expectedToThrow: InvalidPatternError,
        projectRoot: testProjectPath,
      },
      {
        caseName: 'patterns support pattern fragment exclusion',
        config: {
          include: [
            'src/Icons/!(Play)/*.*',
          ],
          name: 'Category Name',
        },
        expectedPaths: [
          'src/Icons/Flower/index.jsx',
          'src/Icons/Search/index.jsx',
        ],
        projectRoot: testProjectPath,
      },
      {
        caseName: 'exclusion patterns support pattern fragment exclusion',
        config: {
          include: [
            'src/Icons/*/*.*',
            '!src/Icons/!(Play)/*.*',
          ],
          name: 'Category Name',
        },
        expectedPaths: [],
        expectedToThrow: InvalidPatternError,
        projectRoot: testProjectPath,
      },
    ];

    using(cases).describe(
      'correctly returns paths for',
      (testCase:TestCase) => {
        const { caseName, expectedToThrow } = testCase;

        it(caseName, expectedToThrow ? assertThrowableTestCase(testCase) : assertTestCase(testCase));
      },
    );
  });
});

interface TestCase {
  caseName:string;
  config:CategoryConfig;
  expectedPaths:string[];
  expectedToThrow?:any;
  projectRoot:string;
}

function assertTestCase({ projectRoot, config, expectedPaths }:TestCase):() => Promise<void> {
  return async () => {
    // when
    const result:string[] = await getComponentCategoryPaths(projectRoot, config);

    // then
    expect(result.sort()).toEqual(expectedPaths);
  };
}

function assertThrowableTestCase({ projectRoot, config, expectedToThrow }:TestCase):() => Promise<void> {
  return async () => {
    // when
    // then
    await expect(getComponentCategoryPaths(projectRoot, config)).rejects.toThrow(expectedToThrow);
  };
}
