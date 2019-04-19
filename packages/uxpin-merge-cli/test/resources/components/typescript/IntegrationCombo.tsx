import * as React from 'react';
import { ExternalShapeType } from './ExternalShapeType';

export interface ComboProps {
  anyProp:any;
  arrayProp:any[];
  unionTypeArrayProp:Array<string | number>;
  booleanProp:boolean;
  elementProp:React.ReactElement<any>;
  functionProp:(a:string) => number;
  stringLiteralUnion:'a' | 'b';
  nodeProp:React.ReactNode;
  objectProp:object;
  typedArray:ExternalShapeType[];
  dictionaryProp:{ [key:string]:number };
  empty:undefined;
  children?:React.ReactNode;
  /**
   * Description for `value` property
   */
  value:string;
  /**
   * Description for optional `id` property
   */
  id?:number;
}

const PrivateComponent:React.StatelessComponent = (props) => {
  return <div>{props.children}</div>;
};

export default class IntegrationCombo extends React.Component<ComboProps> {

  public render():JSX.Element {
    const { value, id } = this.props;
    return (
      <PrivateComponent>
        <button id={`Button${id}`}>
          {value}
        </button>
      </PrivateComponent>
    );
  }
}
