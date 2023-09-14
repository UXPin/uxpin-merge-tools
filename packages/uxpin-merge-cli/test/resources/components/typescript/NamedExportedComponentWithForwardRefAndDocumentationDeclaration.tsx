import React, { forwardRef } from 'react';

export interface Props {
  size: string;
  imageUrl: string;
}

/**
 * @uxpindescription test test
 */
export const NamedExportedComponentWithForwardRefAndDocumentationDeclaration = forwardRef((props: Props) => {
  const { imageUrl, size } = props;
  return (
    <div className={size}>
      <img src={imageUrl} alt="Avatar" />
    </div>
  );
});
