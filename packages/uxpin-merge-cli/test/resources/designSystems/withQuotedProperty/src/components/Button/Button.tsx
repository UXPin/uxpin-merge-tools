import * as React from 'react';

export interface Props {
  children:React.ReactNode;
  'isPrimary'?:boolean;
}

export default class Button extends React.PureComponent<Props> {

  public render():JSX.Element {
    const { children, isPrimary } = this.props;
    return (
      <div>
        <button className={isPrimary ? 'primary' : ''}>
          {children}
        </button>
      </div>
    );
  }
}
