import * as React from 'react';

export interface Props {
  name: string;
}

/**
 * @uxpindescription 123 456 abc efg
 */
export default function FunctionWithDocumentationDeclaration({ name }: Props): JSX.Element {
  return (
    <div>
      <label className={name}>{name}</label>
    </div>
  );
}
