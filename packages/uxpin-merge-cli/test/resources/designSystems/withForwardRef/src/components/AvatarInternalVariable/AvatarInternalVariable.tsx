import * as React from 'react';

export interface Props {
  size: string;
  imageUrl: string;
}

const _AvatarInternalVariable: any = (props: Props) => {
  const { imageUrl, size } = props;
  return (
    <div className={size}>
      <img src={imageUrl} alt="Avatar" />
    </div>
  );
};

const AvatarInternalVariable: any = React.forwardRef<HTMLBaseElement, Props>(_AvatarInternalVariable);

export { AvatarInternalVariable };
