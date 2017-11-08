import { getFileString } from '../../../../../src/steps/building/library/getFileString';
import { ComponentImplementationInfo } from '../../../../../src/steps/discovery/component/ComponentInfo';
import { ComponentDefinition } from '../../../../../src/steps/serialization/component/ComponentDefinition';

describe('getFileString', () => {

  const implementation:ComponentImplementationInfo = { path: '', framework: 'reactjs', lang: 'javascript' };

  it('returns content of library file for list of components', () => {
    const components:ComponentDefinition[] = [
      {
        dirPath: 'src/components/button',
        examples: [],
        implementation: {
          ...implementation,
          path: 'src/components/button/button.jsx',
        },
        name: 'Button',
        properties: [],
      },
      {
        dirPath: 'src/components/button-list',
        examples: [],
        implementation: {
          ...implementation,
          path: 'src/components/button-list/button-list.jsx',
        },
        name: 'ButtonList',
        properties: [],
      },
    ];

    const expectedFileString:string = `import * as React from 'react';
import { render } from 'react-dom';
import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
export {
  Button,
  ButtonList,
  React,
  render,
};`;

    // when
    const result:string = getFileString(components);

    // then
    expect(result).toEqual(expectedFileString);
  });

  it('returns content of library file for list of components and path of custom wrapper', () => {
    const components:ComponentDefinition[] = [
      {
        dirPath: 'src/components/button',
        examples: [],
        implementation: {
          ...implementation,
          path: 'src/components/button/button.jsx',
        },
        name: 'Button',
        properties: [],
      },
      {
        dirPath: 'src/components/button-list',
        examples: [],
        implementation: {
          ...implementation,
          path: 'src/components/button-list/button-list.jsx',
        },
        name: 'ButtonList',
        properties: [],
      },
    ];

    const wrapperPath:string = './wrapper/wrapper.jsx';

    const expectedFileString:string = `import * as React from 'react';
import { render } from 'react-dom';
import Button from '../src/components/button/button';
import ButtonList from '../src/components/button-list/button-list';
import Wrapper from './wrapper/wrapper.jsx';
export {
  Button,
  ButtonList,
  Wrapper,
  React,
  render,
};`;

    // when
    const result:string = getFileString(components, wrapperPath);

    // then
    expect(result).toEqual(expectedFileString);
  });
});
