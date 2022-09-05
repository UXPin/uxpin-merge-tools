import * as React from 'react';

export interface Props {
  name: string;
}

/**
 * @uxpinnamespace Namespace
 */
export default class ClassWithNamespaceDeclaration extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <div>
        <button id={name}>{name}</button>
      </div>
    );
  }
}
