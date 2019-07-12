import React, { PropTypes } from 'react';

const I18N = 'en_US';

export function withI18n(WrappedComponent) {
  return class WithI18n extends React.Component {
    render() {
      return (
        <WrappedComponent i18n={I18N} {...this.props} />
      );
    }
  }
}
