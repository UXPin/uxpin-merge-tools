import * as React from 'react';

export interface Props {
  children:React.ReactNode;
}

export default class Card extends React.PureComponent<Props> {
  public render():JSX.Element {
    const { children } = this.props;

    return (
      <div className="card">
        {children}
      </div>
    );
  }
}
