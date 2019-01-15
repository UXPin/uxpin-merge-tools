export interface JSXSerializedElement {
  children?:AnySerializedElement[];
  name:string;
  props:ElementProps;
}

interface ElementProps {
  uxpId:string;
  [propertyName:string]:any;
}

export type AnySerializedElement = JSXSerializedElement | string;
