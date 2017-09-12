import * as React from 'react';

export interface Props {
  value?:string;
  appearance:'secondary' | 'primary' | 'link';
}

export function labelID(id:string):string {
  return `${id}Label`;
}

export default class ClassWithDefaults extends React.Component<Props> {

  public static defaultProps:Partial<Props> = {
    appearance: 'secondary',
    value: 'Submit',
  };

  public render():JSX.Element {
    const { value, appearance } = this.props;
    return (
      <div>
        <button className={appearance}>
          {
            value
          }
        </button>
      </div>
    );
  }
}
