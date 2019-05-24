export type ComponentPropertyDefinition = ComponentProperty & ComponentPropertyCustomDescriptors;

export interface ComponentProperty {
  defaultValue?:PropertyDefaultValue;
  description:string;
  isRequired:boolean;
  name:string;
  type?:PropertyType;
}

export interface ComponentPropertyCustomDescriptors {
  customDescription?:string;
  customName?:string;
  customType?:PropertyType;
  hidden?:boolean;
}

export enum CustomDescriptorsTags {
  DESCRIPTION = '@uxpindescription',
  HIDDEN = '@uxpinignoreproperty',
  NAME = '@uxpinpropname',
  TYPE = '@uxpintype',
}

export interface PropertyDefaultValue {
  value:any;
}

export interface PropertyType<T extends keyof PropertyTypeStructureMap = keyof PropertyTypeStructureMap> {
  name:T;
  structure:PropertyTypeStructureMap[T];
}

export type PropertyTypeName = keyof PropertyTypeStructureMap;

export interface PropertyTypeStructureMap {
  any:{};
  array:{};
  boolean:{};
  custom:{};
  element:{};
  func:FunctionStructure;
  literal:{ value:string|number };
  node:{};
  number:{};
  object:{};
  shape:ShapeTypeStructure;
  string:{};
  symbol:{};
  typedArray:TypedArrayStructure;
  dictionary:{ valueType:PropertyType };
  union:UnionTypeStructure;
  unsupported:{ raw:string; };
  empty:{};
}

export interface UnionTypeStructure {
  elements:PropertyType[];
}

export interface ShapeTypeStructure {
  [propName:string]:PropertyType;
}

export interface TypedArrayStructure {
  memberType:PropertyType;
}

export interface FunctionStructure {
  arguments?:FunctionArgumentStructure[];
  returnType?:PropertyType;
}

export interface FunctionArgumentStructure {
  name:string;
  type:PropertyType;
}
