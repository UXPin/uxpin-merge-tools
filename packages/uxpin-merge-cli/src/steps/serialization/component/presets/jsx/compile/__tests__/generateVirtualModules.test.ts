import { ComponentInfo } from '../../../../../../discovery/component/ComponentInfo';
import { generateVirtualModules, VirtualComponentModule } from '../generateVirtualModules';

describe('generateVirtualModules', () => {
  it('generates virtual module objects for component infos', () => {
    const componentInfos:ComponentInfo[] = [
      {
        dirPath: 'src/components/Avatar',
        documentation: { path: '' },
        implementation: {
          framework: 'reactjs',
          lang: 'typescript',
          path: 'src/components/Avatar/Avatar.tsx',
        },
        presets: [],
      },
      {
        dirPath: 'src/packages/navigation/Menu',
        documentation: { path: '' },
        implementation: {
          framework: 'reactjs',
          lang: 'javascript',
          path: 'src/packages/navigation/Menu/Menu.js',
        },
        presets: [],
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
    const result:VirtualComponentModule[] = generateVirtualModules(componentInfos);

    // then
    expect(result).toEqual(expectedResult);
  });
});
