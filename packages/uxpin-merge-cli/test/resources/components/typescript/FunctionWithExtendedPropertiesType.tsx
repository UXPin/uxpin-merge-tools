import * as React from 'react';

export interface BaseA {
  /**
   * Documentation of inherited property
   */
  action?: number;
  hidden?: boolean;
}

interface BaseB {
  id: string;
}

export interface Props extends BaseA, BaseB {
  children?: string;
}

function labelID(id: string): string {
  return `${id}Label`;
}

export default function FunctionWithExtendedPropertiesType({ children, id, action, hidden }: Props): JSX.Element {
  return (
    <div>
      <label id={labelID(id)} htmlFor={id} className={hidden ? 'hidden' : ''}>
        {children}
      </label>
    </div>
  );
}
