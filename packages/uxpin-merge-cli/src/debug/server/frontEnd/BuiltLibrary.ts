import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface BuiltLibrary {
  ReactDOM: typeof ReactDOM;
  React: typeof React;
  Wrapper?: React.ComponentClass;
}
