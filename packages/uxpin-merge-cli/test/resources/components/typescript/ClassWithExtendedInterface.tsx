import * as React from 'react';

interface Action {
  actionType:string;
}

interface DisableableAction extends Action {
  disabled?:boolean;
}

interface IconableAction {
  iconType:string;
  size:number;
}

interface ExtendedInterface extends IconableAction, DisableableAction {
  helpText?: string;
  image: string;
}

export default class ClassWithExtendedInterface extends React.Component<ExtendedInterface> {

  public render():JSX.Element {
    const { helpText, disabled } = this.props;
    return (
      <div>
        <button disabled={disabled}>
          {helpText}
        </button>
      </div>
    );
  }
}
