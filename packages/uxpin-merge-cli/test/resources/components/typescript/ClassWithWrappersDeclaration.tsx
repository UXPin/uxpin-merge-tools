import * as React from 'react';

export interface Props {
  name: string;
}

/**
 * @uxpinwrappers
 *   NonResizableWrapper
 *   SkipContainerWrapper
 */
export default class ClassWithWrappersDeclaration extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <div>
        <button id={name}>{name}</button>
      </div>
    );
  }
}
