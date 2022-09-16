import * as React from 'react';

export type Error = string | React.ReactElement<any> | (string | React.ReactElement<any>)[];

interface Props {
  propWithArrayOfUnion: Error;
}

export default class ClassWithArrayOfUnionType extends React.Component<Props> {
  public render(): JSX.Element {
    const { propWithArrayOfUnion } = this.props;
    return (
      <div>
        <button>{propWithArrayOfUnion}</button>
      </div>
    );
  }
}
