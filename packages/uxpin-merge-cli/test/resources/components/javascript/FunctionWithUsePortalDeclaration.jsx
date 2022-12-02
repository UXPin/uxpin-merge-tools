import React, { PropTypes } from 'react';

/**
 * Some component description
 *
 * @uxpinuseportal
 * @param props { name: string }
 */
export default function FunctionWithUsePortalDeclaration({ name }) {
  return (
    <div>
      <label className={name}>{name}</label>
    </div>
  );
}

FunctionWithUsePortalDeclaration.propTypes = {
  name: PropTypes.string.isRequired,
};
