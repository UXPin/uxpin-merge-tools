import React, { Component, PropTypes } from 'react';

function labelID(item) {
  return `${item.param1}Label`;
}

export default class ClassPropShapeType extends Component {

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

ClassPropShapeType.propTypes = {
  item: PropTypes.shape({
    param1: PropTypes.string.isRequired,
    param2: PropTypes.string,
    param3: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
