import React from 'react';
import PropTypes from 'prop-types';

const PropTypesOneOfNumber = ({ typeIndex }) => {
  return <button>{ typeIndex }</button>;
};

PropTypesOneOfNumber.propTypes = {
  typeIndex: PropTypes.oneOf([1, 'test', 3]).isRequired,
};

export default PropTypesOneOfNumber;
