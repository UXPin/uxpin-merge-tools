import React, { Component, PropTypes } from 'react';

function labelID(id) {
  return `${id}Label`;
}

export default class ClassEnumTypes extends Component {

  render() {
    const { children, id, hidden, appearance, modifier } = this.props;
    return (
      <div>
        <button id={labelID(id)}
                className={`${(hidden ? 'hidden' : '')} ${appearance} ${modifier}`}>
          {
            children
          }
        </button>
      </div>
    );
  }
}

ClassEnumTypes.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  appearance: PropTypes.oneOf(['secondary', 'primary', 'link']).isRequired,
  modifier: PropTypes.oneOf(['neutral', 'danger', 'positive']).isRequired,
  hidden: PropTypes.bool.isRequired,
};
