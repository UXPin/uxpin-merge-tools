import * as React from 'react';

interface Props {
  name:string;
}

// tslint:disable:variable-name
export const ComponentContainer:React.SFC<Props> = ({
  name = '',
}:Props) => {

  return (
    <div>{name}</div>
  );
};
