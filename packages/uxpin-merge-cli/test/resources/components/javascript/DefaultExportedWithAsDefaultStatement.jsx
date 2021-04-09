import React from "react";
import PropTypes from "prop-types";

function DefaultExportedWithAsDefaultStatement(props) {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
}

DefaultExportedWithAsDefaultStatement.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

export { DefaultExportedWithAsDefaultStatement as SampleName };
