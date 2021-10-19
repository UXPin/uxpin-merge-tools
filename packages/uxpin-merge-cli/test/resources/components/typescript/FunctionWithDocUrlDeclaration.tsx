import * as React from 'react';

export interface Props {
  name:string;
}

/**
 * @uxpindocurl https://app.uxpin.com/test
 */
export default function FunctionWithDocUrlDeclaration({ name }:Props):JSX.Element {
  return (
    <div>
      <label className={name}>
        {name}
      </label>
    </div>
  );
}
