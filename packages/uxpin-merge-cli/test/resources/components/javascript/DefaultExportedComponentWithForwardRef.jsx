import React, { PropTypes } from 'react';

const DefaultExportedComponentWithForwardRef = React.forwardRef((props) => {
  const { imageUrl, size } = props;
  return (
    <div className={size}>
      <img src={imageUrl} alt="Avatar" />
    </div>
  );
});

DefaultExportedComponentWithForwardRef.propTypes = {
  size: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default DefaultExportedComponentWithForwardRef;
