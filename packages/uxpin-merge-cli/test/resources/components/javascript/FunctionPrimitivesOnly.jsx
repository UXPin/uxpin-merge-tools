import React, { PropTypes } from 'react';

function labelID(id) {
  return `${id}Label`;
}

export default function FunctionPrimitivesOnly({ children, id, action, hidden }) {
  return (
    <div>
      <label id={labelID(id)}
             htmlFor={id}
             className={hidden ? 'hidden' : ''}>
        {
          children
        }
      </label>;
    </div>
  );
}

FunctionPrimitivesOnly.propTypes = {
  children: PropTypes.string,
  id: PropTypes.string.isRequired,
  action: PropTypes.number,
  hidden: PropTypes.bool,
};
