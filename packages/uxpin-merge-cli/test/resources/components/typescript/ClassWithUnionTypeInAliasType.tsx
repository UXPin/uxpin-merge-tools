import * as React from 'react';

export type Size = 'slim' | 'medium' | 'large';

interface Props {
  aliasedUnionProp: Size;
  nestedUnionProp: 'some' | 1 | Size;
}

export default class ClassWithUnionTypeInAliasType extends React.Component<Props> {
  public render(): JSX.Element {
    const { aliasedUnionProp, nestedUnionProp } = this.props;
    return (
      <div>
        <button>
          {aliasedUnionProp} {nestedUnionProp}
        </button>
      </div>
    );
  }
}
