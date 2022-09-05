import * as React from 'react';

export interface Props {
  children: React.ReactNode;
  iconStart?: React.ReactNode;
  isPrimary?: boolean;
}

export default class ButtonWithIconAsProp extends React.PureComponent<Props> {
  public render(): JSX.Element {
    const { children, iconStart, isPrimary } = this.props;
    return (
      <div>
        <button className={isPrimary ? 'primary' : ''}>
          {iconStart}
          {children}
        </button>
      </div>
    );
  }
}
