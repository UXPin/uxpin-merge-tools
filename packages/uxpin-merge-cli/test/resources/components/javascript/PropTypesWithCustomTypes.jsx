import React from 'react';
import PropTypes from 'prop-types';

const PropTypesWithCustomTypes = () => {
  return <button>Button</button>;
};

PropTypesWithCustomTypes.propTypes = {
  /**
   * @uxpincontroltype textfield(0)
   */
  textfield0: PropTypes.string.isRequired,
  /**
   * @uxpincontroltype textfield(5)
   */
  textfield5: PropTypes.string.isRequired,
  /**
   * @uxpincontroltype textfield(foo)
   */
  textfieldCorrupted: PropTypes.string.isRequired,
  /**
   * @uxpincontroltype textfield
   */
  textfieldDefault: PropTypes.string.isRequired,
  /**
   * @uxpincontroltype textfield()
   */
  textfieldDefault2: PropTypes.string.isRequired,
};

export default PropTypesWithCustomTypes;
