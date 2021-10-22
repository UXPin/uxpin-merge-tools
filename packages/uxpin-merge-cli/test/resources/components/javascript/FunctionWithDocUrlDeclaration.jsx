import React, { PropTypes } from 'react';

/**
 * Some component description
 *
 * @uxpindocurl https://app.uxpin.com/test
 * @param props { name: string }
 */
export default function FunctionWithDocUrlDeclaration({ name }) {
  return (
    <div>
      <label className={name}>
        {name}
      </label>
    </div>
  );
}

FunctionWithDocUrlDeclaration.propTypes = {
  name: PropTypes.string.isRequired,
};
