import * as React from 'react';

type TableData = string | number | React.ReactNode;

interface Props {
  rows:TableData[][],
}

export default class ClassWithTwoDimensionalArray extends React.Component<Props> {
  public render():JSX.Element {
    const { rows } = this.props;
    return (
      <div>
        <button>
          {rows}
        </button>
      </div>
    );
  }
}
