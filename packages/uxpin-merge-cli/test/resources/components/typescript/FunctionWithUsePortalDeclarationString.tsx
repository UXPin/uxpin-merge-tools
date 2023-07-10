import * as React from 'react';

export interface Props {
  name: string;
}

/**
 * @uxpinuseportal props.mode === "modal"
 */
export default function FunctionWithUsePortalDeclarationString({ name }: Props): JSX.Element {
  return (
    <div>
      <label className={name}>{name}</label>
    </div>
  );
}
