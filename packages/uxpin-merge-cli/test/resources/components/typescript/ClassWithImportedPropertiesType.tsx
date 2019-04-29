import * as React from 'react';
import { ExternalShapeType, NestedShape } from './ExternalShapeType';
export function labelID(item:NestedShape):string {
  return `${item.keyA}Label`;
}
export default class ClassWithImportedPropertiesType extends React.Component<ExternalShapeType> {
  public render():JSX.Element {
    const { nested } = this.props;
    return (
      <div>
        <button id={labelID(nested)}>
          {nested.keyB}
        </button>
      </div>
    );
  }
}
