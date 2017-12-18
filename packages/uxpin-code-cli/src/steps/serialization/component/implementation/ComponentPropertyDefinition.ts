export interface ComponentPropertyDefinition {
  name:string;
  isRequired:boolean;
  defaultValue?:PropertyDefaultValue;
  description:string;
  type?:PropertyType;
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
  literal:{ value:string };
  node:{};
  number:{};
  object:{};
  shape:ShapeTypeStructure;
  string:{};
  symbol:{};
  typedArray:TypedArrayStructure;
  dictionary:{ valueType:PropertyType };
  union:UnionTypeStructure;
  void:{};
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
