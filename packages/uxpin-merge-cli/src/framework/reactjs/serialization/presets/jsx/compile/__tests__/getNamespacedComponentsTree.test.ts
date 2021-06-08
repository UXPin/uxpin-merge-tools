import { FrameworkNames } from '../../../../../../../framework/frameworkNames';
import { ComponentDefinition } from '../../../../../../../steps/serialization/component/ComponentDefinition';
import { getNamespacedComponentsTree, NamespacedComponentsTree } from '../getNamespacedComponentsTree';

describe('getNamespacedComponentsTree', () => {
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

  it('returns tree with namespaced components', () => {
    // given
    const expectedTree:NamespacedComponentsTree = {
      Button: {
        name: 'Button',
      },
      Card: {
        Body: {
          name: 'Card.Body',
        },
        Header: {
          Menu: {
            name: 'Card.Header.Menu',
          },
          name: 'Card.Header',
        },
        name: 'Card',
      },
    };

    // when
    const result:NamespacedComponentsTree = getNamespacedComponentsTree(components);

    // then
    expect(result).toEqual(expectedTree);
  });

  it('returns empty tree', () => {
    // given
    const emptyComponents:ComponentDefinition[] = [];
    const expectedTree:NamespacedComponentsTree = {};

    // when
    const result:NamespacedComponentsTree = getNamespacedComponentsTree(emptyComponents);

    // then
    expect(result).toEqual(expectedTree);
  });
});
