import * as React from 'react';

export interface Props {
  children: React.ReactNode;
  isPrimary?: boolean;
}

const ButtonWithIconAsProp: React.FC<Props> = (props) => {
  const { children, isPrimary } = props;
  return (
    <div>
      <button className={isPrimary ? 'primary' : ''}>{children}</button>
    </div>
  );
};

export default ButtonWithIconAsProp;
