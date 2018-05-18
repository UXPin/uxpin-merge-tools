export interface ComponentPresetElement {
  name:string;
  props:ComponentPresetElementProps;
}

export interface ComponentPresetElementProps {
  [propName:string]:PropertyValue;
}

export interface ComponentPresetData {
  rootId:string;
  elements:{ [uxpinPresetElementId:string]:ComponentPresetElement };
}

export interface ComponentPreset {
  name:string;
  rootId:string;
  elements:{ [id:string]:ComponentPresetElement };
}

export interface ComponentReference {
  uxpinPresetElementId:string;
}

export type PropertyValue = ComponentReference | any | Array<ComponentReference | any>;
