import * as React from 'react';

export interface Props {
  name: string;
}

/**
 * @uxpinnamespace Namespace
 */
export default function FunctionWithNamespaceDeclaration({ name }: Props): JSX.Element {
  return (
    <div>
      <label className={name}>{name}</label>
    </div>
  );
}
