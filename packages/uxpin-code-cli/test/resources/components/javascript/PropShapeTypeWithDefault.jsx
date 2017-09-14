import React, { Component, PropTypes } from 'react';

function labelID(item) {
  return `${item.param1}Label`;
}

export default class PropShapeTypeWithDefault extends Component {

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

PropShapeTypeWithDefault.propTypes = {
  item: PropTypes.shape({
    param1: PropTypes.string.isRequired,
    param2: PropTypes.string,
    param3: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

PropShapeTypeWithDefault.defaultProps = {
  item: {
    param1: 'param1 default value',
    param3: { name: 'param3.name value' },
  },
};
