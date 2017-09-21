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
  value: PropTypes.string,
  appearance: PropTypes.oneOf(['secondary', 'primary', 'link']).isRequired,
};

ClassWithDefaults.defaultProps = {
  value: 'Submit',
  appearance: 'secondary',
};
