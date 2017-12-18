
export type FlowType = KnownFlowType | FlowUnknownType;

export type KnownFlowType = FlowArray
  | FlowTypeSignature<'function'>
  | FlowTypeSignature<'object'>
  | FlowPrimitiveType
  | FlowUnionType
  | FlowLiteralType;

export type KnownFlowTypeName = KnownFlowType['name'];

export interface FlowArray {
  name:'Array';
  elements:FlowType[];
  raw:string;
}

export interface FlowTypeSignature<T extends keyof FlowTypeSignaturesMap> {
  name:'signature';
  type:T;
  raw:string;
  signature:FlowTypeSignaturesMap[T];
}

export interface FlowTypeSignaturesMap {
  function:FlowFunctionSignature;
  object:FlowObjectSignature;
}

export type FlowSignatureTypeName = keyof FlowTypeSignaturesMap;

export interface FlowFunctionSignature {
  arguments:FlowFunctionSignatureArgumentType[];
  return:FlowType;
}

export interface FlowFunctionSignatureArgumentType {
  name:string;
  type:FlowType;
}

export interface FlowObjectSignature {
  properties:FlowObjectSignatureProperty[];
}

export interface FlowObjectSignatureProperty {
  key:string;
  value:FlowObjectSignaturePropertyValueType;
}

type FlowObjectSignaturePropertyValueType = FlowType & {
  required:boolean;
};

export interface FlowUnionType {
  name:'union';
  raw:string;
  elements:FlowType[];
}

export interface FlowLiteralType {
  name:'literal';
  value:string;
}

export interface FlowUnknownType {
  name:string;
}

export interface FlowPrimitiveType {
  name:FlowPrimitiveTypeName;
}

type FlowPrimitiveTypeName = 'any'
  | 'bool'
  | 'boolean'
  | 'Function'
  | 'null'
  | 'number'
  | 'string'
  | 'void';
