import * as React from 'react';

export interface Props {
  value?:string;
  appearance:'secondary' | 'primary' | 'link';
  /**
   * Default value from JSDoc comment is overridden by value from `defaultProps`
   * @default 4455
   */
  width:number;
  isOpen:boolean;
  isDisabled:boolean;
  /**
   * @default 'JSDoc default value'
   */
  otherValue:string;
  /**
   * @default "JSDoc default value double quoted"
   */
  yetAnotherValue:string;
}

const DEFAULT_VALUE:string = 'Submit';

export default class ClassWithDefaults extends React.Component<Props> {

  public static defaultProps:Partial<Props> = {
    appearance: 'secondary',
    isDisabled: false,
    isOpen: true,
    value: DEFAULT_VALUE,
    width: 1223,
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
