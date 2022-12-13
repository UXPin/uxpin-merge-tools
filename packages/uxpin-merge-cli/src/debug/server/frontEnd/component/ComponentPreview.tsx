import * as React from 'react';
import { ComponentExample } from '../../../../steps/serialization/component/examples/ComponentExample';
import { ExampleRenderer } from '../ExampleRenderer';

interface Props {
  examples: ComponentExample[];
  renderExample: ExampleRenderer;
}

interface State {
  error: string;
}

export class ComponentPreview extends React.Component<Props, State> {
  private container: HTMLElement | null | undefined;

  constructor(props: Props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  public componentDidMount(): void {
    if (this.shouldRenderExample()) {
      const { examples, renderExample } = this.props;
      renderExample(examples[0], this.container as HTMLElement).catch((error: Error) =>
        this.setState({ error: error.message })
      );
    }
  }

  public render(): JSX.Element {
    const { error } = this.state;
    const { examples } = this.props;

    if (!examples.length) {
      return <span style={{ color: 'grey' }}>⚠️ Warning: no code examples</span>;
    }

    if (error) {
      return <span style={{ color: 'red' }}>⛔ Error: {error}</span>;
    }

    return (
      <div
        ref={(ref) => {
          this.container = ref;
        }}
      ></div>
    );
  }

  private shouldRenderExample(): boolean {
    return !!this.container && !this.state.error && this.props.examples.length > 0;
  }
}
