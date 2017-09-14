import React, { Component, PropTypes } from 'react';

export default class ClassEnumTypes extends Component {

  render() {
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

ClassEnumTypes.propTypes = {
  children: PropTypes.node,
  appearance: PropTypes.oneOf(['secondary', 'primary', 'link']).isRequired,
};
