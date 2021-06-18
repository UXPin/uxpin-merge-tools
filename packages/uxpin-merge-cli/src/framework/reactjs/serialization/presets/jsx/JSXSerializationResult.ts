import { WarningDetails } from '../../../../../common/warning/WarningDetails';

export interface JSXSerializedElement {
  children?:AnySerializedElement[];
  name:string;
  props:JSXSerializedElementProps;
  uxpinPresetElementType:'CodeComponent';
  warnings:WarningDetails[];
}

export interface PartialProps {
  [propertyName:string]:JSXSerializedElementProp;
}

export interface JSXSerializedElementProps extends PartialProps {
  uxpId:string;
}

export type AnySerializedElement = JSXSerializedElement | string;

export type JSXSerializedElementProp = JSXSerializedElement | any;
