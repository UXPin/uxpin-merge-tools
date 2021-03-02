import * as React from 'react';

export interface Props {
  /**
   * Dates only
   */
  dateInteger:Date;
  dateString:Date;
  dateEmpty:Date;
  dateRest:Date;
}

export default class ClassWithDateType extends React.Component<Props> {

  public static defaultProps:Partial<Props> = {
    dateInteger: new Date(1468959781804),
    dateString: new Date("2010-08-08"),
    dateEmpty: new Date(),
    dateRest: new Date(1997, 7, 7, 7),
  };

  public render():JSX.Element {
    const { dateInteger, dateString, dateEmpty, dateRest } = this.props;
    let isoInteger = dateInteger.toISOString().split('T')[0];
    let isoString = dateString.toISOString().split('T')[0];
    let isoEmpty = dateEmpty.toISOString().split('T')[0];
    let isoRest = dateRest.toISOString().split('T')[0];
    return (
      <label>
        <input type="date" value={isoInteger}/>
        <input type="date" value={isoString}/>
        <input type="date" value={isoEmpty}/>
        <input type="date" value={isoRest}/>
      </label>
    );
  }
}
