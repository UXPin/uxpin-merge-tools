import * as React from 'react';
import { ExternalShapeType } from './ExternalShapeType';

export interface Props {
  children?: string;
  item: ExternalShapeType;
}

function FunctionWithSeparateNamedExportDeclaration({ children, item }: Props): JSX.Element {
  return (
    <div>
      <label id={item.name} htmlFor={item.name} className={item.nested.keyA}>
        {children}
      </label>
    </div>
  );
}

export { FunctionWithSeparateNamedExportDeclaration };
