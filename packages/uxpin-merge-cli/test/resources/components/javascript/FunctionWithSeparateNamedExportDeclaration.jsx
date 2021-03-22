import React, { PropTypes } from 'react';

function labelID(id) {
  return `${id}Label`;
}

function FunctionWithSeparateNamedExportDeclaration({ children, id, appearance, modifier, hidden }) {
  return (
    <div>
      <button id={labelID(id)}
        className={`${(hidden ? 'hidden' : '')} ${appearance} ${modifier}`}>
        {children}
      </button>
    </div>
  );
};

FunctionWithSeparateNamedExportDeclaration.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  appearance: PropTypes.oneOf(['secondary', 'primary', 'link']).isRequired,
  modifier: PropTypes.oneOf(['neutral', 'danger', 'positive']),
  hidden: PropTypes.bool.isRequired,
};

FunctionWithSeparateNamedExportDeclaration.defaultProps = {
  hidden: false,
  modifier: 'neutral',
};

export { FunctionWithSeparateNamedExportDeclaration }
