import * as React from 'react';

export interface Props {
  children?:React.ReactNode;
  id:string;
  appearance:'secondary' | 'primary' | 'link';
  modifier:'neutral' | 'danger' | 'positive';
  hidden:boolean;
}

export function labelID(id:string):string {
  return `${id}Label`;
}

export default class ClassEnumTypes extends React.PureComponent<Props> {

  public render():JSX.Element {
    const { children, id, hidden, appearance, modifier } = this.props;
    return (
      <div>
        <button id={labelID(id)}
                className={`${(hidden ? 'hidden' : '')} ${appearance} ${modifier}`}>
          {
            children
          }
        </button>
      </div>
    );
  }
}
