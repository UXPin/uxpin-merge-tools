import React from 'react';
import PropTypes from 'prop-types';

const PropTypesWithTextfieldCustomType = () => {
  return <button>Button</button>;
};

PropTypesWithTextfieldCustomType.propTypes = {
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
  /**
   * textfield control type should be ignored for a number
   *
   * @uxpincontroltype textfield
   */
  numberProp: PropTypes.number.isRequired,
  /**
   * textfield control type should be ignored for a boolean
   *
   * @uxpincontroltype textfield
   */
  boolProp: PropTypes.bool.isRequired,
  /**
   * @uxpincontroltype input
   */
  childrenProp: PropTypes.node,
  /**
   * @uxpincontroltype textfield(10)
   */
  childrenProp2: PropTypes.node,
};

export default PropTypesWithTextfieldCustomType;
