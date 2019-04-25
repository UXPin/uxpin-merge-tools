import { ComponentDefinition } from '../../../../ComponentDefinition';
import { generateVirtualModules, VirtualComponentModule } from '../generateVirtualModules';

describe('generateVirtualModules', () => {
  it('generates virtual module objects for component infos', () => {
    const components:ComponentDefinition[] = [
      {
        documentation: { examples: [] },
        info: {
          dirPath: 'src/components/Avatar',
          documentation: { path: '' },
          implementation: {
            framework: 'reactjs',
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
        documentation: { examples: [] },
        info: {
          dirPath: 'src/packages/navigation/Menu',
          documentation: { path: '' },
          implementation: {
            framework: 'reactjs',
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
});
