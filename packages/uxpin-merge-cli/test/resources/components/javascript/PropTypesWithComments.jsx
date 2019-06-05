import React from 'react';
import PropTypes from 'prop-types';

const PropTypesWithComments = ({ isDisabled }) => {
  return <button disabled={ isDisabled }>Button</button>;
};

PropTypesWithComments.propTypes = {
  /**
   * @uxpindescription Multiline
   * description
   * of
   * the
   * component.
   * @uxpinpropname type
   */
  buttonType: PropTypes.string.isRequired,
  /**
   * This is description of isDisabled property
   *
   * @uxpindescription Custom description
   * @uxpinignoreproperty
   * @uxpinpropname disabled
   */
  isDisabled: PropTypes.bool.isRequired,
};

export default PropTypesWithComments;
