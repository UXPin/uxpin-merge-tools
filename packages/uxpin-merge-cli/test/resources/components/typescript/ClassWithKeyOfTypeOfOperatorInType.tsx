import * as React from 'react';
import { ExternalShapeType } from './ExternalShapeType';

const externalShape: ExternalShapeType = {
  name: 'someName',
  nested: {
    keyA: 'keyA',
    keyB: 'keyB',
  },
  value: 1,
};

const someValue = 5;

interface Props {
  typeOfProp: typeof someValue;
  keyOfProp: keyof ExternalShapeType;
  keyOfTypeOfProp: keyof typeof externalShape;
}

export default class ClassWithKeyOfTypeOfOperatorInType extends React.Component<Props> {
  public render(): JSX.Element {
    const { typeOfProp, keyOfProp, keyOfTypeOfProp } = this.props;
    return (
      <div>
        <button>
          {typeOfProp} {keyOfProp} {keyOfTypeOfProp}
        </button>
      </div>
    );
  }
}
