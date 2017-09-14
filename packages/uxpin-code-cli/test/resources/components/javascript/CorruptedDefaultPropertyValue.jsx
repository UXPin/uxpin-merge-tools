import React, { Component, PropTypes } from 'react';

function labelID(item) {
  return `${item.param1}Label`;
}

export default class CorruptedDefaultPropertyValue extends Component {

  render() {
    const { item } = this.props;
    return (
      <div>
        <button id={labelID(item)}>
          {item.param3.name}
        </button>
      </div>
    );
  }
}

CorruptedDefaultPropertyValue.propTypes = {
  item: PropTypes.string.isRequired,
};

CorruptedDefaultPropertyValue.defaultProps = {
  item: `some value concatenated with ${some.value} a value raising exception`,
};
