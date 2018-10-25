import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { classNames } from '../../utils/classNames';
import './button.css'

export default class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    primary: PropTypes.bool.isRequired,
  };

  render() {
    const { children, primary } = this.props;
    const className = classNames({
      'watch__btn': true,
      'watch__btn--primary': primary,
    });

    return (
      <button className={className}>
        {children}
      </button>
    );
  }
}
