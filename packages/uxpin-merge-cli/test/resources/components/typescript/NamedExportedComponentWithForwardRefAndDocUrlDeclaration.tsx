import React, { forwardRef } from 'react';

export interface Props {
  size: string;
  imageUrl: string;
}

/**
 * @uxpindocurl https://app.uxpin.com/test
 */
export const NamedExportedComponentWithForwardRefAndDocUrlDeclaration = forwardRef((props: Props) => {
  const { imageUrl, size } = props;
  return (
    <div className={size}>
      <img src={imageUrl} alt="Avatar" />
    </div>
  );
});
