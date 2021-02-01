import React from "react";
import PropTypes from "prop-types";

function Button({ onClick, className, label, name, value, disabled }) {
  return (
    <button
      className={className}
      name={name}
      onClick={onClick}
      type="button"
      value={value}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  name: null,
  value: undefined,
  onClick: null,
  disabled: false,
  label: null,
};

export { Button as default };
