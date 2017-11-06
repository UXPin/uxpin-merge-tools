import { transform } from 'babel-standalone';
import { ComponentExample } from '../../../steps/serialization/component/examples/ComponentExample';
import { ExampleRenderer } from './ExampleRenderer';

export function thunkRenderExample(library:{string:() => any}, componentNames:string[]):ExampleRenderer {
  return (example, container) => new Promise((resolve) => {
    const { render } = library as any;
    const html:string = getHtml(example, componentNames);

    // tslint:disable:no-eval
    const preview:JSX.Element = eval(transform(html, {
      presets: [
        'es2015',
        'react',
      ],
    }).code || '');
    render(preview,  container);
    resolve();
  });
}

function getHtml(example:ComponentExample, componentNames:string[]):string {
  return `const { ${componentNames.join(', ')} } = library;

${example.code}`;
}
