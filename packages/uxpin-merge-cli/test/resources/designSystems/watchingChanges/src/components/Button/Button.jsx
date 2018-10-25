import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const styles = { width: '100%', height: '100%' };

export default class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    primary: PropTypes.bool.isRequired,
  };

  render() {
    const { children, primary } = this.props;

    return (
      <button style={styles} className={primary ? 'btn__primary' : ''}>
        {children} {primary ? 'Primary' : ''}
      </button>
    );
  }
}
