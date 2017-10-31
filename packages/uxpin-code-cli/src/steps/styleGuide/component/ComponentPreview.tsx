import { transform } from 'babel-standalone';
import * as React from 'react';
import { ComponentExample } from '../../serialization/component/examples/ComponentExample';

interface Props {
  componentNames:string[];
  examples:ComponentExample[];
  library:{string:() => any};
}

interface State {
  error:string;
}

export class ComponentPreview extends React.Component<Props, State> {
  private container:HTMLElement | null;

  constructor(props:Props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  public componentDidMount():void {
    if (!this.shouldRenderExample()) {
      return;
    }

    const { componentNames, examples, library } = this.props;
    const { render } = library as any;
    const html:string = getHtml(examples, componentNames);

    try {
      // tslint:disable:no-eval
      const example:JSX.Element = eval(transform(html, {
        presets: [
          'es2015',
          'react',
        ],
      }).code || '');
      render(example,  this.container);
    } catch (e) {
      console.warn(e);
      this.setState({ error: e.message });
    }
  }

  public render():JSX.Element {
    const { error } = this.state;
    const { examples } = this.props;

    if (!examples.length) {
      return (
        <span style={{ color: 'grey' }}>⚠️ Warning: no code examples</span>
      );
    }

    if (error) {
      return (
        <span style={{ color: 'red' }}>⛔ Error: {error}</span>
      );
    }

    return (
      <div ref={(ref) => { this.container = ref; }}></div>
    );
  }

  protected shouldRenderExample():boolean {
    return !!this.container && !this.state.error && this.props.examples.length > 0;
  }
}

function getHtml(examples:ComponentExample[], componentNames:string[]):string {
  return `const { ${componentNames.join(', ')} } = library;

${examples[0].code}`;
}
