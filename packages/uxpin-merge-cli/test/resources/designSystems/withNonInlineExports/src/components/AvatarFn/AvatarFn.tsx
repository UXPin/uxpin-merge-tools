import * as React from 'react';

export interface Props {
  size: string;
  imageUrl: string;
}

function AvatarFn(props: Props): JSX.Element {
  const { imageUrl, size } = props;
  return (
    <div className={size}>
      <img src={imageUrl} alt="Avatar" />
    </div>
  );
}

export { AvatarFn };
