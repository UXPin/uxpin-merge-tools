import React, { PropTypes } from 'react';

/**
 * Some component description
 *
 * @uxpinnamespace CustomNamespace
 * @param props { name: string }
 * @uxpinwrappers NonResizableWrapper
 */
export default function FunctionWithNamespaceAndWrappersDeclaration({ name }) {
  return (
    <div>
      <label className={name}>
        {name}
      </label>
    </div>
  );
}

FunctionWithNamespaceAndWrappersDeclaration.propTypes = {
  name: PropTypes.string.isRequired,
};
