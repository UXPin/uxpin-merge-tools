import * as React from 'react';
// tslint:disable-next-line:no-duplicate-imports
import { forwardRef } from 'react';

export interface Props {
  size: string;
  imageUrl: string;
}

export default forwardRef<HTMLBaseElement, Props>((props) => {
  const { imageUrl, size } = props;
  return (
    <div className={size}>
      <img src={imageUrl} alt="Avatar" />
    </div>
  );
});
