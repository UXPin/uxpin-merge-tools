import * as React from 'react';

export interface Props {
  children: any;
}

export default class Button extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const { children } = this.props;

    return <button>{children}</button>;
  }
}
