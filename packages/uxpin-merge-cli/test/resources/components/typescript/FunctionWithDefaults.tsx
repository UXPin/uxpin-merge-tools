import * as React from 'react';

export interface Props {
  children?:React.ReactNode;
  id:string;
  appearance:'secondary' | 'primary' | 'link';
  modifier?:'neutral' | 'danger' | 'positive';
  hidden:boolean;
}

function labelID(id:string):string {
  return `${id}Label`;
}

const FunctionWithDefaults:React.StatelessComponent<Props> = ({ children, id, appearance, modifier, hidden }) => {
  return (
    <div>
      <button id={labelID(id)}
              className={`${(hidden ? 'hidden' : '')} ${appearance} ${modifier}`}>
        {children}
      </button>
    </div>
  );
};

FunctionWithDefaults.defaultProps = {
  hidden: false,
  modifier: 'neutral',
};

export default FunctionWithDefaults;
