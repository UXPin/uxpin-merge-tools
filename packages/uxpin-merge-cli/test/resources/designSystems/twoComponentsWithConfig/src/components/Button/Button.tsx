import * as React from 'react';

export interface Props {
  children?:React.ReactNode;
  appearance:'secondary' | 'primary' | 'link';
}

export default class Button extends React.PureComponent<Props> {

  public render():JSX.Element {
    const { children, appearance } = this.props;
    return (
      <div>
        <button className={appearance}>
          {children}
        </button>
      </div>
    );
  }
}
