import React, { PropTypes } from 'react';

const NamedExportedComponentWithForwardRef = React.forwardRef((props) => {
  const { imageUrl, size } = props;
  return (
    <div className={size}>
      <img src={imageUrl} alt="Avatar" />
    </div>
  );
});

NamedExportedComponentWithForwardRef.propTypes = {
  size: PropTypes.string,
  imageUrl: PropTypes.string,
}

export { NamedExportedComponentWithForwardRef };
