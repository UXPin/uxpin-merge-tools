import React, { PropTypes } from 'react';

/**
 * @uxpinnamespace Multi.Level.CustomNamespace
 * @uxpindocurl https://app.uxpin.com/test
 */
export const NamedExportedComponentWithForwardRefAndDocUrl = React.forwardRef((props) => {
  const { imageUrl, size } = props;
  return (
    <div className={size}>
      <img src={imageUrl} alt="Avatar" />
    </div>
  );
});

NamedExportedComponentWithForwardRefAndDocUrl.propTypes = {
  size: PropTypes.string,
  imageUrl: PropTypes.string,
};
