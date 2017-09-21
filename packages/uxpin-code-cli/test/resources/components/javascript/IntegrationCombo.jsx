import React, { Component, PropTypes } from 'react';

export default class ClassWithDefaults extends Component {

  render() {
    const { value, appearance } = this.props;
    return (
      <div>
        <button className={appearance}>
          {value}
        </button>
      </div>
    );
  }
}

ClassWithDefaults.propTypes = {
  /**
   * Description for `value` property
   */
  value: PropTypes.string,
  /**
   * Select the appearance of the button
   */
  appearance: PropTypes.oneOf(['secondary', 'primary', 'link']).isRequired,
};

ClassWithDefaults.defaultProps = {
  value: 'Submit',
  appearance: 'secondary',
};
