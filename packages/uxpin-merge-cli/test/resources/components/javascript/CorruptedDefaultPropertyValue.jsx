import React, { Component, PropTypes } from 'react';

export default class CorruptedDefaultPropertyValue extends Component {

  render() {
    const { value } = this.props;
    return (
      <div>
        <button>
          {value}
        </button>
      </div>
    );
  }
}

CorruptedDefaultPropertyValue.propTypes = {
  value: PropTypes.string.isRequired,
};

CorruptedDefaultPropertyValue.defaultProps = {
  value: some,
};
