import * as React from 'react';

export interface Props {
  /**
   * @uxpindescription Multiline
   * description
   * of
   * the
   * component.
   * @uxpinpropname type
   */
  buttonType:string;
  /**
   * This is description of isDisabled property
   *
   * @uxpindescription Custom description
   * @uxpinignoreprop
   * @uxpinpropname disabled
   */
  isDisabled:boolean;
  /**
   * Callback when a link is clicked
   * @uxpindescription some alternative custom function description
   * @uxpinignoreprop
   */
  onClick():void;
}

export default class ClassWithPropTypesWithComments extends React.Component<Props> {
  public render():JSX.Element {
    const { isDisabled } = this.props;

    return <button disabled={isDisabled} />;
  }
}
