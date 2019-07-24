export type ComponentWrapper = BuiltInComponentWrapper | CustomComponentWrapper;

export interface GenericComponentWrapper {
  name:string;
  type:ComponentWrapperType;
}

export type BuiltInComponentWrapper = GenericComponentWrapper & {
  type:ComponentWrapperType.BUILT_IN;
};

export type CustomComponentWrapper = GenericComponentWrapper & {
  path:string;
  type:ComponentWrapperType.CUSTOM;
};

export enum ComponentWrapperType {
  BUILT_IN = 'builtIn',
  CUSTOM = 'custom,'
}

export enum BuiltInWrappers {
  NON_RESIZABLE_WRAPPER = 'NonResizableWrapper',
  SKIP_CONTAINER_WRAPPER = 'SkipContainerWrapper',
}
