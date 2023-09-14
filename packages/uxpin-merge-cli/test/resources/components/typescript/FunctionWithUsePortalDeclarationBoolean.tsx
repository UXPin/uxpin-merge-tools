import * as React from 'react';

export interface Props {
  name: string;
}

/**
 * @uxpinuseportal
 */
export default function FunctionWithUsePortalDeclarationBoolean({ name }: Props): JSX.Element {
  return (
    <div>
      <label className={name}>{name}</label>
    </div>
  );
}
