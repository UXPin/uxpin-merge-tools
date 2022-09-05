import * as React from 'react';

export interface Props {
  /**
   * Dates only
   */
  dateInteger: Date;
  dateString: Date;
  dateRest: Date;
}

export default class ClassWithDateType extends React.Component<Props> {
  public static defaultProps: Partial<Props> = {
    dateInteger: new Date(1468959781804),
    dateString: new Date('2010-08-08'),
    dateRest: new Date(1997, 1, 1, 1, 1, 1, 1),
  };

  public render(): JSX.Element {
    const { dateInteger, dateString, dateRest } = this.props;
    const isoInteger = dateInteger.toISOString().split('T')[0];
    const isoString = dateString.toISOString().split('T')[0];
    const isoRest = dateRest.toISOString().split('T')[0];
    return (
      <label>
        <input type="date" value={isoInteger} />
        <input type="date" value={isoString} />
        <input type="date" value={isoRest} />
      </label>
    );
  }
}
