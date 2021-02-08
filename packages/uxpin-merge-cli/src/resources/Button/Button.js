import React from "react";
import PropTypes from "prop-types";

function Button({ onClick, label, disabled }) {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {label}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.node,
};

Button.defaultProps = {
  onClick: null,
  disabled: false,
  label: null,
};

export { Button as default };
