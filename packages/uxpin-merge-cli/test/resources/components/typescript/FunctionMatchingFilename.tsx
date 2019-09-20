import * as React from 'react';

export interface Props {
  name:string;
}

export function FunctionMatchingFilename({ name }:Props):JSX.Element {
  return (
    <div>
      <label className={name}>
        {name}
      </label>
    </div>
  );
}

export default function SomeOtherComponent():JSX.Element {
  return (
    <div>Other!</div>
  );
}
