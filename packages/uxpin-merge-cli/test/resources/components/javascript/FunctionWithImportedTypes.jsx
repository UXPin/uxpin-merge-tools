import React, { PropTypes } from 'react';
import { appearancePropType } from './propTypes/appearancesPropTypes';

function FunctionWithImportedTypes({ children, appearance }) {
  return (
    <div>
      <button
        className={`${appearance}`}
      >
        {children}
      </button>
    </div>
  );
}

FunctionWithImportedTypes.propTypes = {
  appearance: appearancePropType,
  children: PropTypes.node,
};

export default FunctionWithImportedTypes;
