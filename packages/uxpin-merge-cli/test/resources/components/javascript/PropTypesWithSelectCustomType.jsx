import React from 'react';
import PropTypes from 'prop-types';

const PropTypesWithSelectCustomType = () => {
  return <button>Button</button>;
};

PropTypesWithSelectCustomType.propTypes = {
  /**
   * @uxpincontroltype select
   */
  unionLiteral: PropTypes.oneOf(['yes', 'no']),
  /**
   * @uxpincontroltype number
   */
  unionTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * @uxpincontroltype switcher
   */
  unionTypesWrongCustom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default PropTypesWithSelectCustomType;
