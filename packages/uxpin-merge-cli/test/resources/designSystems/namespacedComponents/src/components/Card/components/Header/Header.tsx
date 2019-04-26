import * as React from 'react';

export interface Props {
  children:React.ReactNode;
  title:string;
}

/**
 * @uxpinnamespace Card
 */
export default class Header extends React.PureComponent<Props> {
  public render():JSX.Element {
    const { children, title } = this.props;

    return (
      <header>
        <h1>{title}</h1>
        {children}
      </header>
    );
  }
}
