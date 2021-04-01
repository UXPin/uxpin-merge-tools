import * as React from 'react';

export interface Props {
  dateEmpty:Date;
}

export default class ClassWithEmptyDateType extends React.Component<Props> {

  public static defaultProps:Partial<Props> = {
    dateEmpty: new Date(),
  };

  public render():JSX.Element {
    const { dateEmpty } = this.props;
    let isoEmpty = dateEmpty.toISOString().split('T')[0];
    return (
      <label>
        <input type="date" value={isoEmpty}/>
      </label>
    );
  }
}
