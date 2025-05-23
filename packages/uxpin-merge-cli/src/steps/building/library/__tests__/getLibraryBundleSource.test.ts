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

  it('returns content of library file for list of components', () => {
    const expectedFileString = `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
// react 19 -----
let createRoot = null;
try {
  const reactDomClient = require('react-dom/client')
  if (reactDomClient.createRoot) {
    createRoot = reactDomClient.createRoot
  }
} catch (e) {}
// react 19 -----
export {
  Button,
  ButtonList,
  React,
  ReactDOM,
  createRoot,
};`;

    // when
    const result: string = getLibraryBundleSource(components);

    // then
    expect(result).toEqual(expectedFileString);
  });

  it('returns content of library file for list of components and path of custom wrapper', () => {
    const wrapperPath = './wrapper/wrapper.jsx';

    const expectedFileString = `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
import Wrapper from '../wrapper/wrapper.jsx';
// react 19 -----
let createRoot = null;
try {
  const reactDomClient = require('react-dom/client')
  if (reactDomClient.createRoot) {
    createRoot = reactDomClient.createRoot
  }
} catch (e) {}
// react 19 -----
export {
  Button,
  ButtonList,
  Wrapper,
  React,
  ReactDOM,
  createRoot,
};`;

    // when
    const result: string = getLibraryBundleSource(components, { wrapperPath });

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
// react 19 -----
let createRoot = null;
try {
  const reactDomClient = require('react-dom/client')
  if (reactDomClient.createRoot) {
    createRoot = reactDomClient.createRoot
  }
} catch (e) {}
// react 19 -----
export {
  Card,
  Card_Header,
  Card_Header_Menu,
  React,
  ReactDOM,
  createRoot,
};`;

    // when
    const result: string = getLibraryBundleSource(components);

    // then
    expect(result).toEqual(expectedFileString);
  });

  it('returns content of library file for list of components and path of custom wrapper with normalized path', () => {
    const components: ComponentDefinition[] = [
      {
        defaultExported: true,
        info: {
          dirPath: 'src\\components',
          implementation: {
            ...commonImplementation,
            path: 'button\\button.jsx',
          },
        },
        name: 'Button',
        ...commonProps,
      },
      {
        defaultExported: true,
        info: {
          dirPath: 'src\\components',
          implementation: {
            ...commonImplementation,
            path: 'button-list\\button-list.jsx',
          },
        },
        name: 'ButtonList',
        ...commonProps,
      },
    ];

    const wrapperPath = 'wrapper\\wrapper.jsx';

    const expectedFileString = `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
import Wrapper from '../wrapper/wrapper.jsx';
// react 19 -----
let createRoot = null;
try {
  const reactDomClient = require('react-dom/client')
  if (reactDomClient.createRoot) {
    createRoot = reactDomClient.createRoot
  }
} catch (e) {}
// react 19 -----
export {
  Button,
  ButtonList,
  Wrapper,
  React,
  ReactDOM,
  createRoot,
};`;

    // when
    const result: string = getLibraryBundleSource(components, { wrapperPath });

    // then
    expect(result).toEqual(expectedFileString);
  });

  it('handles `pageHeadTags` option to add a script in the bundle', () => {
    const expectedFileString = `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
// react 19 -----
let createRoot = null;
try {
  const reactDomClient = require('react-dom/client')
  if (reactDomClient.createRoot) {
    createRoot = reactDomClient.createRoot
  }
} catch (e) {}
// react 19 -----
export {
  Button,
  ButtonList,
  React,
  ReactDOM,
  createRoot,
};

const template = document.createElement('template');
template.innerHTML = \`<style>.blue {color: blue;}</style>\`;
const nodes = Array.from(template.content.children);
nodes.forEach(node => document.head.prepend(node));
`;

    // when
    const pageHeadTags = ['<style>.blue {color: blue;}</style>'];
    const result: string = getLibraryBundleSource(components, { pageHeadTags });

    // then
    expect(result).toEqual(expectedFileString);
  });
});
