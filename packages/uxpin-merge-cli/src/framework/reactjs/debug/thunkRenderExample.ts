import { transform } from 'babel-standalone';
import { ComponentExample } from '../../../steps/serialization/component/examples/ComponentExample';
import { BuiltLibrary } from './BuiltLibrary';
import { ExampleRenderer } from './ExampleRenderer';

export function thunkRenderExample(library:BuiltLibrary, componentNames:string[]):ExampleRenderer {
  return (example, container) => new Promise((resolve) => {
    const { React, ReactDOM, Wrapper } = library;
    const jsxCode:string = getJSX(example, componentNames);

    // tslint:disable:no-eval variable-name
    const Preview:JSX.Element = eval(transform(jsxCode, {
      presets: [
        'es2015',
        'react',
      ],
    }).code || '');

    if (Wrapper) {
      ReactDOM.render(React.createElement(Wrapper, undefined, Preview), container);
    } else {
      ReactDOM.render(Preview, container);
    }

    resolve();
  });
}

function getJSX(example:ComponentExample, componentNames:string[]):string {
  return `const { React } = library;
const { ${componentNames.join(', ')} } = library;

${example.code}`;
}
