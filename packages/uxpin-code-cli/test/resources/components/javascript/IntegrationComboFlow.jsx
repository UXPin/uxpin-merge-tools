
/* @flow */
import React, { Component } from 'react';

type NestedCustomType = {
  propOfNested?: {prop: any};
}

type CustomType = {
  firstProp: Function,
  secondProp: Array<number>,
  otherProp:NestedCustomType
}

type Props = {
  /** Rendered content of the component */
  children: React$Node,
  /** Disables the Button */
  disabled?: boolean,
  /** Stretch button to it's parent */
  fullWidth?: bool,
  /** Element to be used as the root node - e.g. `a` can be used to create a link that is styled like a Button */
  element?: $FlowFixMe, // Should allow string | React class
  /** Icon that goes after the children*/
  iconEnd?: React$Component<*>,
  /** Icon that goes before the children */
  iconStart?: React$Element<*>,
  /** Called with the click event */
  onClick?: (event: SyntheticEvent<>) => void,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** Available types */
  type?: string | Object,
  data: CustomType
};

export default class IntegrationComboFlow extends Component<Props> {
  static defaultProps = {
    element: 'button',
    size: 'large',
    type: 'button',
  };

  render() {
    return <button>{this.children}</button>;
  }
}
