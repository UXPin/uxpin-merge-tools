import * as React from 'react';

enum NumericEnum {
  Zero = 0,
  One = 1,
}

enum CustomNumericEnum {
  Blue = 3,
  Red,
  Green,
}

enum ComputedEnum {
  Friday = 1,
  Sunday = Friday * 40,
}

enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = 'YES',
}

enum PropSizeEnum {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export interface Props {
  /**
   * String only
   */
  children?: string;
  appearance: 'secondary' | 'primary' | 'link';
  size?: PropSizeEnum;
  propNumeric: NumericEnum;
  propCustomNumeric: CustomNumericEnum;
  propComputed: ComputedEnum;
  propHeterogeneous: BooleanLikeHeterogeneousEnum;
}

export default class ClassEnumTypes extends React.PureComponent<Props> {
  public static defaultProps: Partial<Props> = {
    propNumeric: NumericEnum.One,
    propCustomNumeric: CustomNumericEnum.Green,
    propComputed: ComputedEnum.Sunday,
    propHeterogeneous: BooleanLikeHeterogeneousEnum.No,
  };

  public render(): JSX.Element {
    const { children, appearance, propNumeric, propCustomNumeric, propComputed, propHeterogeneous } = this.props;
    return (
      <div>
        <button className={appearance}>{children}</button>
        <button>{propNumeric}</button>
        <button>{propCustomNumeric}</button>
        <button>{propComputed}</button>
        <button>{propHeterogeneous}</button>
      </div>
    );
  }
}
