import React, { PropTypes } from 'react';

/**
 * Some component description
 *
 * @uxpindescription test test
 * @param props { name: string }
 */
export default function FunctionWithDescriptionDeclaration({ name }) {
  return (
    <div>
      <label className={name}>{name}</label>
    </div>
  );
}

FunctionWithDescriptionDeclaration.propTypes = {
  name: PropTypes.string.isRequired,
};
