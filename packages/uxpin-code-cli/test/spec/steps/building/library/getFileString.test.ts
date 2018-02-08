import { getFileString } from '../../../../../src/steps/building/library/getFileString';
import { ComponentImplementationInfo } from '../../../../../src/steps/discovery/component/ComponentInfo';
import { ComponentDefinition } from '../../../../../src/steps/serialization/component/ComponentDefinition';

describe('getFileString', () => {

  const commonImplementation:ComponentImplementationInfo = { path: '', framework: 'reactjs', lang: 'javascript' };
  const commonProps:Pick<ComponentDefinition, 'properties'|'documentation'> = {
    documentation: { examples: [] },
    properties: [],
  };

  it('returns content of library file for list of components', () => {
    const components:ComponentDefinition[] = [
      {
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

    const expectedFileString:string = `import * as React from 'react';
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
    const result:string = getFileString(components);

    // then
    expect(result).toEqual(expectedFileString);
  });

  it('returns content of library file for list of components and path of custom wrapper', () => {
    const components:ComponentDefinition[] = [
      {
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

    const wrapperPath:string = './wrapper/wrapper.jsx';

    const expectedFileString:string = `import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
import Wrapper from './wrapper/wrapper.jsx';
export {
  Button,
  ButtonList,
  Wrapper,
  React,
  ReactDOM,
};`;

    // when
    const result:string = getFileString(components, wrapperPath);

    // then
    expect(result).toEqual(expectedFileString);
  });
});
