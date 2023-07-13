import * as React from 'react';
import { render } from 'react-dom';
import { ComponentDefinition } from '../../../steps/serialization/component/ComponentDefinition';
import { BuiltLibrary } from './BuiltLibrary';
import { ComponentsList } from './ComponentsList';
import { thunkRenderExample } from './thunkRenderExample';

require('require1k');
declare let R: any;
const {
  __PRELOADED_STATE__: { components },
}: PreloadedState = window as any;

R('./designsystemlibrary', (err: Error, library: BuiltLibrary) => {
  const componentNames: string[] = components.map((component) => component.name);
  render(
    <ComponentsList components={components} renderExample={thunkRenderExample(library, componentNames)} />,
    document.getElementById('root')
  );
});

interface PreloadedState {
  __PRELOADED_STATE__: { components: ComponentDefinition[] };
}
