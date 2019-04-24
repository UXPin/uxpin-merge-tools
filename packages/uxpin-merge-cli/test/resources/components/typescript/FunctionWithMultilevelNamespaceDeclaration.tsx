import * as React from 'react';

export interface Props {
  name:string;
}

/**
 * @uxpinnamespace Some.Nested.Namespace
 */
export default function FunctionWithMultilevelNamespaceDeclaration({ name }:Props):JSX.Element {
  return (
    <div>
      <label className={name}>
        {name}
      </label>
    </div>
  );
}
