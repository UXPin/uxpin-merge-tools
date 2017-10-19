import { transform } from 'babel-core';
import * as React from 'react';
import { ComponentExample } from '../../serialization/component/examples/ComponentExample';

interface Props {
  examples:ComponentExample[];
  imports:string[];
}

// tslint:disable:variable-name
export const ComponentPreview:React.SFC<Props> = ({
  examples,
  imports,
}:Props) => {

  if (!examples.length) {
    return (
      <span style={{ color: 'grey' }}>⚠️ Warning: no code examples</span>
    );
  }

  const __html:string = getHtml(examples, imports);

  try {
    // tslint:disable:no-eval
    return eval(transform(__html, {
      babelrc: false,
      presets: [
        '../../../../node_modules/babel-preset-es2015',
        '../../../../node_modules/babel-preset-react',
      ],
    }).code || '');
  } catch (e) {
    console.log(e);
    return (
      <span style={{ color: 'red' }}>⛔ Error: {e.message}</span>
    );
  }
};

function getHtml(examples:ComponentExample[], imports:string[]):string {
  return `const React = require('react');
${imports.join('\n')}

${examples[0].code}`;
}
