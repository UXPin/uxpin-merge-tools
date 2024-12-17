import React, { PropTypes } from 'react';

function labelID(id) {
  return `${id}Label`;
}

export default function FunctionPrimitivesOnly(props) {
  return (
    <div>
      <label id={labelID(props?.id)}
             htmlFor={props?.id}
             className={props?.hidden ? 'hidden' : ''}>
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
