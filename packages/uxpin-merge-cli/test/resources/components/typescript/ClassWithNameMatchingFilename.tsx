import * as React from 'react';

export interface Props {
  name:string;
}

export class ClassWithNameMatchingFilename extends React.Component<Props> {
  public render():JSX.Element {
    return (
      <div>
        <button id={name}>
          {name}
        </button>
      </div>
    );
  }
}

export default class SomeOtherClass extends React.Component<{}> {
  public render():JSX.Element {
    return (
      <div>Other!</div>
    );
  }
}
