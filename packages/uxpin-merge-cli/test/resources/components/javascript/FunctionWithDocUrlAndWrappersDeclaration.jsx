import React, { PropTypes } from 'react';

/**
 * Some component description
 *
 * @uxpindocurl https://app.uxpin.com/test
 * @param props { name: string }
 * @uxpinwrappers NonResizableWrapper
 */
export default function FunctionWithDocUrlAndWrappersDeclaration({ name }) {
  return (
    <div>
      <label className={name}>
        {name}
      </label>
    </div>
  );
}

FunctionWithDocUrlAndWrappersDeclaration.propTypes = {
  name: PropTypes.string.isRequired,
};
