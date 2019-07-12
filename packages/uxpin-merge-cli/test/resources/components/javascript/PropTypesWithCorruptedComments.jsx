import React from 'react';
import PropTypes from 'prop-types';

const PropTypesWithCorruptedComments = ({ isDisabled }) => {
  return <button disabled={ isDisabled }>Button</button>;
};

PropTypesWithCorruptedComments.propTypes = {
  /**
   * @uxpinpropname duplicatedCustomName
   */
  buttonType: PropTypes.string.isRequired,
  /**
   * @uxpinpropname duplicatedCustomName
   */
  isDisabled: PropTypes.bool.isRequired,
  /**
   * @uxpinpropname isDisabled
   */
  isDisabledDuplicate: PropTypes.bool.isRequired,
};

export default PropTypesWithCorruptedComments;
