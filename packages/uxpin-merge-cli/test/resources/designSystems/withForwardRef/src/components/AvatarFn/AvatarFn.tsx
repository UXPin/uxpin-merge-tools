import * as React from 'react';

export interface Props {
  size: string;
  imageUrl: string;
}

export default React.forwardRef<HTMLBaseElement, Props>((props) => {
  const { imageUrl, size } = props;
  return (
    <div className={size}>
      <img src={imageUrl} alt="Avatar" />
    </div>
  );
});
