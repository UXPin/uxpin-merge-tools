import * as React from 'react';

export interface Props {
  /**
   * @uxpinpropname duplicatedCustomName
   */
  buttonType: string;
  /**
   * @uxpinpropname duplicatedCustomName
   */
  isDisabled: boolean;
  /**
   * @uxpinpropname isDisabled
   */
  isDisabledDuplicate: boolean;
}

export default class ClassWithCorruptedComments extends React.Component<Props> {
  public render(): JSX.Element {
    const { isDisabled } = this.props;

    return <button disabled={isDisabled} />;
  }
}
