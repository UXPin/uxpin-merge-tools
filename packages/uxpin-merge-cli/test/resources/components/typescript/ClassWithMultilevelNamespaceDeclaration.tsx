import * as React from 'react';

export interface Props {
  name:string;
}

/**
 * @uxpinnamespace Some.Nested.Namespace
 */
export default class ClassWithMultilevelNamespaceDeclaration extends React.Component<Props> {
  public render():JSX.Element {
    return (
      <div>
        <button id={name}>
          {name}
        </button>
      </div>
    );
  }
}
