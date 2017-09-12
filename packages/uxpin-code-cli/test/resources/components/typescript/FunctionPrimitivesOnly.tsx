import * as React from 'react';

export interface Props {
  children?:string;
  id:string;
  action?:number;
  hidden?:boolean;
}

export function labelID(id:string):string {
  return `${id}Label`;
}

export default function FunctionPrimitivesOnly({ children, id, action, hidden }:Props):JSX.Element {
  return (
    <div>
      <label id={labelID(id)}
             htmlFor={id}
             className={hidden ? 'hidden' : ''}>
        {
          children
        }
      </label>;
    </div>
  );
}
