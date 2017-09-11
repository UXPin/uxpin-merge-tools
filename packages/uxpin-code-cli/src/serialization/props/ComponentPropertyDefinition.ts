export interface ComponentPropertyDefinition {
  name:string;
  isRequired:boolean;
  defaultValue?:PropertyDefaultValue;
  description:string;
  type:PropertyType;
}

export interface PropertyDefaultValue {
  value:any;
  isComputed:boolean;
}

export interface PropertyType<T extends keyof PropertyTypeStructureMap = keyof PropertyTypeStructureMap> {
  name:T;
  structure:PropertyTypeStructureMap[T];
}

export interface PropertyTypeStructureMap {
  any:{};
  array:{};
  bool:{};
  custom:{};
  element:{};
  func:{};
  literal:{ value:string };
  node:{};
  number:{};
  object:{};
  shape:{ [propName:string]:PropertyType };
  string:{};
  symbol:{};
  typedArray:{ memberType:PropertyType };
  dictionary:{ valueType:PropertyType };
  union:{ elements:PropertyType[] };
}
