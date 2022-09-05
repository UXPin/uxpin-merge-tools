import * as React from 'react';
import { ExternalShapeType, NestedShape } from './ExternalShapeType';

export function labelID(item: NestedShape): string {
  return `${item.keyA}Label`;
}

interface Props {
  /**
   * Local property
   */
  id: string;
}

type CombinedType = ExternalShapeType & Props;

export default class ClassWithCombinedPropertiesType extends React.Component<CombinedType> {
  public render(): JSX.Element {
    const { nested } = this.props;
    return (
      <div>
        <button id={labelID(nested)}>{nested.keyB}</button>
      </div>
    );
  }
}
