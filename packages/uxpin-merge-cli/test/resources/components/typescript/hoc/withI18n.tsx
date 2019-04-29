import React from 'react';

export interface I18nProps {
  i18n:string;
}

const I18N:string = 'en_US';

export function withI18n<P extends object>(
  WrappedComponent:React.ComponentType<P>
):React.ComponentType<P & I18nProps> {
  return class WithI18n extends React.Component<P & I18nProps> {
    render():JSX.Element {
      return (
        <WrappedComponent i18n={I18N} {...this.props} />
      );
    }
  }
}
