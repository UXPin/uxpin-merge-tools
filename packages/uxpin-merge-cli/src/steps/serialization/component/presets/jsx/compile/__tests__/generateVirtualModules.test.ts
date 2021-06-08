import { FrameworkNames } from '../../../../../../../framework/frameworkNames';
import { ComponentDefinition } from '../../../../ComponentDefinition';
import { generateVirtualModules, VirtualComponentModule } from '../generateVirtualModules';

describe('generateVirtualModules', () => {
  it('generates virtual module objects for component definitions', () => {
    const components:ComponentDefinition[] = [
      {
        defaultExported: true,
        documentation: { examples: [] },
        info: {
          dirPath: 'src/components/Avatar',
          documentation: { path: '' },
          implementation: {
            framework: FrameworkNames.reactjs,
            lang: 'typescript',
            path: 'src/components/Avatar/Avatar.tsx',
          },
          presets: [],
        },
        name: 'Avatar',
        presets: [],
        properties: [],
      },
      {
        defaultExported: true,
        documentation: { examples: [] },
        info: {
          dirPath: 'src/packages/navigation/Menu',
          documentation: { path: '' },
          implementation: {
            framework: FrameworkNames.reactjs,
            lang: 'javascript',
            path: 'src/packages/navigation/Menu/Menu.js',
          },
          presets: [],
        },
        name: 'Menu',
        presets: [],
        properties: [],
      },
    ];

    const expectedResult:VirtualComponentModule[] = [
      {
        moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {"name":"Avatar"};`,
        path: 'src/components/Avatar/Avatar',
      },
      {
        moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {"name":"Menu"};`,
        path: 'src/packages/navigation/Menu/Menu',
      },
    ];

    // when
    const result:VirtualComponentModule[] = generateVirtualModules(components);

    // then
    expect(result).toEqual(expectedResult);
  });

  it('generates virtual module objects for namespaced component definitions', () => {
    const components:ComponentDefinition[] = [
      {
        defaultExported: true,
        documentation: { examples: [] },
        info: {
          dirPath: 'src/components/Button',
          documentation: { path: '' },
          implementation: {
            framework: FrameworkNames.reactjs,
            lang: 'typescript',
            path: 'src/components/Button/Button.tsx',
          },
          presets: [],
        },
        name: 'Button',
        presets: [],
        properties: [],
      },
      {
        defaultExported: true,
        documentation: { examples: [] },
        info: {
          dirPath: 'src/components/Card',
          documentation: { path: '' },
          implementation: {
            framework: FrameworkNames.reactjs,
            lang: 'typescript',
            path: 'src/components/Card/Card.tsx',
          },
          presets: [],
        },
        name: 'Card',
        presets: [],
        properties: [],
      },
      {
        defaultExported: true,
        documentation: { examples: [] },
        info: {
          dirPath: 'src/components/Card/components/Body',
          documentation: { path: '' },
          implementation: {
            framework: FrameworkNames.reactjs,
            lang: 'typescript',
            path: 'src/components/Card/components/Body/Body.tsx',
          },
          presets: [],
        },
        name: 'Body',
        namespace: {
          importSlug: 'Card_Body',
          name: 'Card',
        },
        presets: [],
        properties: [],
      },
      {
        defaultExported: true,
        documentation: { examples: [] },
        info: {
          dirPath: 'src/components/Card/components/Header',
          documentation: { path: '' },
          implementation: {
            framework: FrameworkNames.reactjs,
            lang: 'typescript',
            path: 'src/components/Card/components/Header/Header.tsx',
          },
          presets: [],
        },
        name: 'Header',
        namespace: {
          importSlug: 'Card_Header',
          name: 'Card',
        },
        presets: [],
        properties: [],
      },
      {
        defaultExported: true,
        documentation: { examples: [] },
        info: {
          dirPath: 'src/components/Card/components/Header/components/Menu',
          documentation: { path: '' },
          implementation: {
            framework: FrameworkNames.reactjs,
            lang: 'typescript',
            path: 'src/components/Card/components/Header/components/Menu/Menu.tsx',
          },
          presets: [],
        },
        name: 'Menu',
        namespace: {
          importSlug: 'Card_Header_Menu',
          name: 'Card.Header',
        },
        presets: [],
        properties: [],
      },
    ];

    // tslint:disable max-line-length
    const expectedResult:VirtualComponentModule[] = [
      {
        moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {"name":"Button"};`,
        path: 'src/components/Button/Button',
      },
      {
        moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {"name":"Card","Body":{"name":"Card.Body"},"Header":{"name":"Card.Header","Menu":{"name":"Card.Header.Menu"}}};`,
        path: 'src/components/Card/Card',
      },
      {
        moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {"name":"Card.Body"};`,
        path: 'src/components/Card/components/Body/Body',
      },
      {
        moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {"name":"Card.Header","Menu":{"name":"Card.Header.Menu"}};`,
        path: 'src/components/Card/components/Header/Header',
      },
      {
        moduleSource: `
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {"name":"Card.Header.Menu"};`,
        path: 'src/components/Card/components/Header/components/Menu/Menu',
      },
    ];
    // tslint:enable max-line-length

    // when
    const result:VirtualComponentModule[] = generateVirtualModules(components);

    // then
    expect(result).toEqual(expectedResult);
  });
});
