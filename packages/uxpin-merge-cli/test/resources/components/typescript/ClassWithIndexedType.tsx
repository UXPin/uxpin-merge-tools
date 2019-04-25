import * as React from 'react';
import { ExternalShapeType } from './ExternalShapeType';

type AliasKey = ExternalShapeType['value'];

export interface OtherType {
  key1:string;
  key2:ExternalShapeType;
  key3:AliasKey;
}

type AliasKey1 = OtherType['key2'];
type AliasKey2 = OtherType['key3'];

interface Props {
  propLocal:OtherType['key1'];
  propAliasShape:AliasKey1;
  propAliasNumber:AliasKey2;
}

export default class ClassWithIndexedType extends React.Component<Props> {
  public render():JSX.Element {
    const { propLocal, propAliasShape, propAliasNumber } = this.props;
    return (
      <div>
        <button className={propLocal}>
          {propAliasShape} {propAliasNumber}
        </button>
      </div>
    );
  }
}
