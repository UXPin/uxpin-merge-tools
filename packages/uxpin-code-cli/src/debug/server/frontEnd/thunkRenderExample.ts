import { transform } from 'babel-standalone';
import { ComponentExample } from '../../../steps/serialization/component/examples/ComponentExample';
import { BuiltLibrary } from './BuiltLibrary';
import { ExampleRenderer } from './ExampleRenderer';

export function thunkRenderExample(library:BuiltLibrary, componentNames:string[]):ExampleRenderer {
  return (example, container) => new Promise((resolve) => {
    const html:string = getHtml(example, componentNames);

    // tslint:disable:no-eval
    const preview:JSX.Element = eval(transform(html, {
      presets: [
        'es2015',
        'react',
      ],
    }).code || '');
    library.render(preview,  container);
    resolve();
  });
}

function getHtml(example:ComponentExample, componentNames:string[]):string {
  return `const { React } = library;
const { ${componentNames.join(', ')} } = library;

${example.code}`;
}
