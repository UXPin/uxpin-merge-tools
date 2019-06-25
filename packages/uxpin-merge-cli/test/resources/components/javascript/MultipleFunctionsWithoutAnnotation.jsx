import React, { PropTypes } from 'react';

/**
 * Some component description
 */
export function Function1({ name }) {
  return (
    <div>
      <label className={name}>
        {name}
      </label>
    </div>
  );
}

Function1.propTypes = {
  name: PropTypes.string.isRequired,
};

/**
 * Some component description
 *
 * Another component without uxpin annotation
 */
export function Function2({ name }) {
  return (
    <div>
      <label className={name}>
        {name}
      </label>
    </div>
  );
}

Function2.propTypes = {
  name: PropTypes.string.isRequired,
};
