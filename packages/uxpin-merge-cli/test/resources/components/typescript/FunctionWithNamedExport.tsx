import * as React from 'react';
import { ExternalShapeType } from './ExternalShapeType';

export interface Props {
  children?:string;
  item:ExternalShapeType;
}

export function FunctionWithNamedExport({ children, item }:Props):JSX.Element {
  return (
    <div>
      <label id={item.name}
             htmlFor={item.name}
             className={item.nested.keyA}>
        {children}
      </label>
    </div>
  );
}
