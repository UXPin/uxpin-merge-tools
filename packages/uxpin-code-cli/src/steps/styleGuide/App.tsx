import * as React from 'react';
import { render } from 'react-dom';
import { StyleGuide } from './StyleGuide';

declare var R:any;

const { __PRELOADED_STATE__: { components } } = window as any;

R('./designsystemlibrary', (err:Error, library:{string:() => any}) => {
  render((
    <StyleGuide components={components} library={library} />
  ),  document.getElementById('root'));

});
