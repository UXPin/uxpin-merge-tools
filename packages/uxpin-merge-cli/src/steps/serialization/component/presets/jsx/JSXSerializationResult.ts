export interface JSXSerializedElement {
  children?:AnySerializedElement[];
  name:string;
  props:JSXSerializedElementProps;
  uxpinPresetElementType:'CodeComponent';
}

export interface JSXSerializedElementProps {
  uxpId:string;
  [propertyName:string]:JSXSerializedElementProp;
}

export type AnySerializedElement = JSXSerializedElement | string;

export type JSXSerializedElementProp = JSXSerializedElement | any;
