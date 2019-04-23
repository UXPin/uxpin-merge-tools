import * as React from 'react';
import { ExternalShapeType } from './ExternalShapeType';

export interface OtherType {
  key1:string;
  key2:ExternalShapeType;
  key3:number;
}

type AliasKey1 = OtherType['key2'];
type AliasKey2 = OtherType['key3'];

interface Props {
  propLocal:OtherType['key1'];
  // propAliasShape:AliasKey1;
  // propAliasNumber:AliasKey2;
}

export default class ClassWithIndexedType extends React.Component<Props> {
  public render():JSX.Element {
    const { propLocal } = this.props;
    return (
      <div>
        <button>
          {propLocal}
        </button>
      </div>
    );
  }
}
