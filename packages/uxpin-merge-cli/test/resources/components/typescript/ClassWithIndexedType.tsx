import * as React from 'react';
import { ExternalShapeType } from './ExternalShapeType';

export interface OtherType {
  key1:string;
  key2:ExternalShapeType;
  key3:number;
}

type AliasKey1 = OtherType['key2'];
type AliasKey2 = OtherType['key3'];

enum Test{}

type OpenHandler = (somArg:string) => void;

interface Props {
  objectProp:object;
  arrayProp:any[];
  /**
   * Inline function type
   */
  onClick?:() => void;
  /**
   * Type alias reference
   */
  onOpen?:OpenHandler;
  children?:React.ReactNode;
  appearance:'secondary' | 'primary' | 'link';
  reactTest: React.ReactNode,
  booleanTest:boolean,
  test12: Test;
  test10: "20",
  test11: 20,
  test8: (a: string) => number;
  test9(b:number): boolean;
  test1: number;
  test2: string;
  test4: number[];
  test5: OtherType;
  test6: number | string;
  test7: {
    testNested: string;
  };
  propLocal:OtherType['key3'];
  propAliasShape:AliasKey1;
  propAliasNumber:AliasKey2;
}

export default class ClassWithIndexedType extends React.Component<Props> {
  public render():JSX.Element {
    const { propLocal, propAliasShape, propAliasNumber } = this.props;
    return (
      <div>
        <button className={propLocal}>
          {propAliasShape} {propAliasNumber}
        </button>
      </div>
    );
  }
}
/*
export type IconSource =
    | React.ReactNode
    | 'placeholder'

export interface Props {
  /!** The SVG contents to display in the icon. Icons should be in a 20 X 20 pixel viewbox *!/
  source: IconSource;
  /!** Show a backdrop behind the icon *!/
  backdrop?: boolean;
  /!** Descriptive text to be read to screenreaders *!/
  accessibilityLabel?: string;
  /!** Render the icon in an img tag instead of an svg. Prevents XSS *!/
  /!** @deprecated the untrusted prop is deprecated and will be removed. All raw strings passed into the Icon component will be assumed to be untrusted *!/
  untrusted?: boolean;
}*/
