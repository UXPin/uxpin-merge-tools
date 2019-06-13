import React, { PropTypes } from 'react';

/**
 * @uxpinnamespace CustomNamespace
 */
export default function FunctionWithNamespaceDeclaration({ name }) {
  return (
    <div>
      <label className={name}>
        {name}
      </label>
    </div>
  );
}

FunctionWithNamespaceDeclaration.propTypes = {
  name: PropTypes.string.isRequired,
};
