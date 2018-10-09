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
  /**
   * oneOfType property type
   */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.node)]),
  appearance: PropTypes.oneOf(['secondary', 'primary', 'link']).isRequired,
};
