import { ComponentImplementationInfo } from '../../../discovery/component/ComponentInfo';
import { ComponentDefinition } from '../../../serialization/component/ComponentDefinition';
import { getLibraryBundleSource } from '../getLibraryBundleSource';

describe('getLibraryBundleSource', () => {
  const commonImplementation: ComponentImplementationInfo = { path: '', framework: 'reactjs', lang: 'javascript' };
  const commonProps: Pick<ComponentDefinition, 'properties' | 'documentation' | 'presets'> = {
    documentation: { examples: [] },
    presets: [],
    properties: [],
  };

  it('returns content of library file for list of components', () => {
    const components: ComponentDefinition[] = [
      {
        defaultExported: true,
        info: {
          dirPath: 'src/components/button',
          implementation: {
            ...commonImplementation,
            path: 'src/components/button/button.jsx',
          },
        },
        name: 'Button',
        ...commonProps,
      },
      {
        defaultExported: true,
        info: {
          dirPath: 'src/components/button-list',
          implementation: {
            ...commonImplementation,
            path: 'src/components/button-list/button-list.jsx',
          },
        },
        name: 'ButtonList',
        ...commonProps,
      },
    ];

    const expectedFileString = `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
export {
  Button,
  ButtonList,
  React,
  ReactDOM,
};`;

    // when
    const result: string = getLibraryBundleSource(components);

    // then
    expect(result).toEqual(expectedFileString);
  });

  it('returns content of library file for list of components and path of custom wrapper', () => {
    const components: ComponentDefinition[] = [
      {
        defaultExported: true,
        info: {
          dirPath: 'src/components/button',
          implementation: {
            ...commonImplementation,
            path: 'src/components/button/button.jsx',
          },
        },
        name: 'Button',
        ...commonProps,
      },
      {
        defaultExported: true,
        info: {
          dirPath: 'src/components/button-list',
          implementation: {
            ...commonImplementation,
            path: 'src/components/button-list/button-list.jsx',
          },
        },
        name: 'ButtonList',
        ...commonProps,
      },
    ];

    const wrapperPath = './wrapper/wrapper.jsx';

    const expectedFileString = `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
import Wrapper from '../wrapper/wrapper.jsx';
export {
  Button,
  ButtonList,
  Wrapper,
  React,
  ReactDOM,
};`;

    // when
    const result: string = getLibraryBundleSource(components, wrapperPath);

    // then
    expect(result).toEqual(expectedFileString);
  });

  it('returns content of library file for list of components including namespaced components', () => {
    const components: ComponentDefinition[] = [
      {
        defaultExported: true,
        info: {
          dirPath: 'src/components/card',
          implementation: {
            ...commonImplementation,
            path: 'src/components/card/card.jsx',
          },
        },
        name: 'Card',
        ...commonProps,
      },
      {
        defaultExported: true,
        info: {
          dirPath: 'src/components/card/components/header',
          implementation: {
            ...commonImplementation,
            path: 'src/components/card/components/header/header.jsx',
          },
        },
        name: 'Header',
        namespace: {
          importSlug: 'Card_Header',
          name: 'Card',
        },
        ...commonProps,
      },
      {
        defaultExported: true,
        info: {
          dirPath: 'src/components/card/components/header/components/menu',
          implementation: {
            ...commonImplementation,
            path: 'src/components/card/components/header/components/menu/menu.jsx',
          },
        },
        name: 'Menu',
        namespace: {
          importSlug: 'Card_Header_Menu',
          name: 'Card.Header',
        },
        ...commonProps,
      },
    ];

    const expectedFileString = `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Card from '../src/components/card/card';
const Card_Header = Card.Header;
const Card_Header_Menu = Card.Header.Menu;
export {
  Card,
  Card_Header,
  Card_Header_Menu,
  React,
  ReactDOM,
};`;

    // when
    const result: string = getLibraryBundleSource(components);

    // then
    expect(result).toEqual(expectedFileString);
  });
});
