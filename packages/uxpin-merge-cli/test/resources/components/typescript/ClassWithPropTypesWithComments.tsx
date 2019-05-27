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
   * @uxpinignoreproperty
   * @uxpinpropname disabled
   */
  isDisabled:boolean;
}

export default class ClassWithPropTypesWithComments extends React.Component<Props> {
  public render():JSX.Element {
    const { isDisabled } = this.props;

    return <button disabled={isDisabled} />;
  }
}
