import React, { PropTypes } from 'react';

/**
 * Some component description
 *
 * @uxpinnamespace CustomNamespace
 * @param props { name: string }
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
