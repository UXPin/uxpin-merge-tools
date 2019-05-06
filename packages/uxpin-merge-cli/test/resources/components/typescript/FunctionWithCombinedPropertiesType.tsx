import * as React from 'react';
import { ExternalShapeType, NestedShape } from './ExternalShapeType';
import { withI18n } from './hoc/withI18n';

export function labelID(item:NestedShape):string {
  return `${item.keyA}Label`;
}

export interface Props {
  /**
   * Local property
   */
  id:string;
  hidden:boolean;
  children?:string;
}

export type CombinedType = Props & ExternalShapeType;

/**
 * @uxpincomponent
 */
function FunctionWithCombinedPropertiesType({
  children,
  hidden,
  id,
  nested: { keyA, keyB },
}:CombinedType) {
  return (
    <div>
      <label id={labelID({ keyA, keyB })}
             htmlFor={id}
             className={hidden ? 'hidden' : ''}>
        {children}
      </label>
    </div>
  );
}

export default withI18n(FunctionWithCombinedPropertiesType);
