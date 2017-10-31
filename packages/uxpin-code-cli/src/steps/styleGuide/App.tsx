import * as React from 'react';
import { render } from 'react-dom';
import { ComponentsList } from './ComponentsList';

// tslint:disable:no-var-requires
require('require1k');
declare var R:any;

const { __PRELOADED_STATE__: { components } } = window as any;

R('./designsystemlibrary', (err:Error, library:{string:() => any}) => {
  render((
    <ComponentsList components={components} library={library} />
  ),  document.getElementById('root'));

});
