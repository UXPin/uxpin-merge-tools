import * as React from 'react';

export interface Props {
  children?:React.ReactNode;
  id:string;
  appearance:string;
  modifier?:string;
  hidden:boolean;
}

function labelID(id:string):string {
  return `${id}Label`;
}

const DEFAULT_MODIFIER:string = 'neutral';

const ArrowFunctionWithDefaultsInDestructuring:React.StatelessComponent<Props> = ({
  children,
  id,
  appearance,
  modifier = DEFAULT_MODIFIER,
  hidden = false,
}) => {
  return (
    <div>
      <button id={labelID(id)}
              className={`${(hidden ? 'hidden' : '')} ${appearance} ${modifier}`}>
        {children}
      </button>
    </div>
  );
};

export default ArrowFunctionWithDefaultsInDestructuring;
