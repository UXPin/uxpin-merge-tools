import * as React from 'react';

type OpenHandler = (somArg:string) => void;

export interface Props {
  value:string;
  /**
   * Inline function type
   */
  onClick?:() => void;
  /**
   * Type alias reference
   */
  onOpen?:OpenHandler;
  /**
   * Method signature
   */
  onResize(width:number, height:number):number;
  /**
   * Optional method signature
   */
  onMouseEnter?():void;
}

export default class ClassWithFunctionTypes extends React.Component<Props> {

  public render():JSX.Element {
    const { value } = this.props;
    return (
      <div>
        <button>
          {
            value
          }
        </button>
      </div>
    );
  }
}
