import React, { PropTypes } from 'react';
import appearances from './utils/appearances';
import { modifiers } from './utils/modifiers';

function FunctionWithImportedEnum({ children, appearance, modifier }) {
  return (
    <div>
      <button
        className={`${appearance} ${modifier}`}
      >
        {children}
      </button>
    </div>
  );
};

FunctionWithImportedEnum.propTypes = {
  children: PropTypes.node,
  appearance: PropTypes.oneOf(appearances).isRequired,
  modifier: PropTypes.oneOf(modifiers),
};

export default FunctionWithImportedEnum;
